import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextLayoutEventData,
  ScrollView,
  Dimensions,
} from "react-native";

import parkingData from "../data/parkingData.json";
import { ParkingSpot } from "../types/ParkingListingTypes";
import { getTwoLargestLengths } from "../utils";

// this will simulate an API call so we can show the load
const fetchParkingDataAPICall = async (): Promise<ParkingSpot | string> => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(parkingData as ParkingSpot);
      }, 2000); // Simulating 2 seconds delay
    });
  } catch (error) {
    //would usually return the error message of the API call if this was real or the http status
    console.error(error);
    return "error loading data";
  }
};

const handleReserveButtonPress = async () => {
  console.log("Reserving spot...");

  try {
    const result = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000); // Simulating a 2-second delay
    });

    console.log("Spot reserved successfully!", result);
    return result;
  } catch (error) {
    console.error("Error reserving spot:", error);
    return "error loading data";
  }
};

export const ParkingListing = () => {
  const [parkingListingData, setParkingListingData] = React.useState<
    ParkingSpot | null | string
  >(null);
  const screenHeight = Dimensions.get("window").height;
  const [isFavorited, setIsFavorited] = React.useState<boolean>(false);
  const [isTruncated, setIsTruncated] = React.useState(false);
  const [isTextExpanded, setIsTextExpanded] = React.useState(false);
  //set to true to start off because we are gonna get it from our mock api call to start
  const [isDataLoading, setIsDataLoading] = React.useState<boolean>(true);
  const [isReserving, setIsReserving] = React.useState<boolean>(false);
  const heartImageSource = isFavorited
    ? require("../../assets/icons8-heart-50FIll.png")
    : require("../../assets/icons8-heart-50 outline.png");

  React.useEffect(() => {
    const fetchParkingData = async () => {
      const data = await fetchParkingDataAPICall();
      setParkingListingData(data);
      setIsDataLoading(false);
    };
    fetchParkingData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    amenitiesContainer: { height: "auto", padding: 20 },
    headlineText: {
      fontWeight: "bold",
      alignSelf: "flex-start",
      fontSize: 20,
      marginBottom: 10,
    },
    footer: {
      position: "absolute",
      bottom: 0,
      zIndex: 100,
      width: "90%",
      alignSelf: "center",

      justifyContent: "space-between",

      flexDirection: "row",
      backgroundColor: "white",
    },
    separator: {
      alignSelf: "center",
      width: "90%",
      backgroundColor: "blue",
      borderColor: "gray",
      borderTopWidth: 1,
    },
    ratingsAndReviews: {
      flexDirection: "row",
      marginTop: "auto",
      marginBottom: "auto",
      alignItems: "center",
    },
    ratingsAndReviewsContainer: {
      flexDirection: "row",
      alignContent: "center",
      width: "35%",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 5,
    },
    scrollView: { marginBottom: 50 },
    shareAndFavoriteContainer: {
      alignSelf: "flex-end",
      flexDirection: "row",
      justifyContent: "space-between", // This ensures space between the buttons
      width: 100, // Define a fixed width for spacing
    },
    normalText: { fontSize: 16 },
    titleAndDescriptionContainer: { marginBottom: 5 },
    icon: { width: 24, height: 24 },
    topButtons: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    backButtonContainer: {
      alignSelf: "flex-start",
    },
    headerBar: {
      zIndex: 10,
      backgroundColor: "rgba(0, 0, 0, 0.2)", // Dark overlay with 40% opacity
      flexDirection: "row",
      position: "absolute",
      top: 0,
      width: "100%",
      justifyContent: "space-between",
      padding: 10,
    },
    imageContainer: { backgroundColor: "red", height: screenHeight / 6 },
    reserveButton: {
      backgroundColor: "black",
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 5,
      margin: 5,
      width: "30%",
      alignSelf: "center",
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: "center",
    },
    button: {
      backgroundColor: "white",
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 20,
      marginTop: 10,
      width: "90%",
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: "center",
    },
    buttonText: {
      fontSize: 16,
      color: "black",
    },
    reserveButtonText: {
      fontSize: 16,
      color: "white",
    },
    loadingText: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const onPressReserve = async () => {
    setIsReserving(true);
    const result = await handleReserveButtonPress();
    if (result === true) {
      alert("Reservation successful!");
    } else {
      alert("Reservation failed!");
    }
    setIsReserving(false);
  };

  const handleTextLayout = (
    event: NativeSyntheticEvent<TextLayoutEventData>
  ) => {
    const [biggest, secondBiggest] = getTwoLargestLengths(
      event.nativeEvent.lines
    );
    if (biggest > secondBiggest + 25) {
      setIsTruncated(true);
    }
  };

  if (isDataLoading || isReserving) {
    return (
      <>
        <View style={styles.loadingContainer}>
          {isDataLoading ? (
            <Text style={styles.loadingText}>
              Waiting for your parking spot data to load please wait
            </Text>
          ) : (
            <Text style={styles.loadingText}>
              Reserving your spot please wait
            </Text>
          )}

          <ActivityIndicator style={{ marginTop: 10 }} size={"large"} />
        </View>
      </>
    );
  }
  //would usually say if it is server error or client error based on error message from real API call
  if (typeof parkingListingData === "string") {
    return (
      <>
        <View>
          <Text>Sorry error loading up data please try again later</Text>
        </View>
      </>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.topButtons}
              onPress={() => console.log("Back pressed")}
            >
              <Image
                source={require("../../assets/icons8-back-arrow-50.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.shareAndFavoriteContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.topButtons}
              onPress={() => console.log("Share pressed")}
            >
              <Image
                source={require("../../assets/icons8-share-rounded-32.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.topButtons}
              onPress={() => setIsFavorited(!isFavorited)}
            >
              <Image
                source={heartImageSource}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.imageContainer}>
            <ImageBackground
              style={styles.container}
              source={require("../../assets/reserved parking spot_10441780.jpg")}
            ></ImageBackground>
          </View>
          <View>
            <View
              style={{
                padding: 20,
                flexDirection: "column",
              }}
            >
              <View style={styles.titleAndDescriptionContainer}>
                <Text style={styles.headlineText}>
                  {parkingListingData?.title}
                </Text>
              </View>
              <View style={styles.titleAndDescriptionContainer}>
                <Text style={styles.normalText}>
                  {parkingListingData?.minor_description}
                </Text>
              </View>
              <View style={styles.ratingsAndReviewsContainer}>
                <View style={styles.ratingsAndReviews}>
                  <Image
                    style={styles.icon}
                    source={require("../../assets/icons8-star-30.png")}
                  />
                  <Text style={styles.normalText}>
                    {parkingListingData?.host_rating.toString()}
                  </Text>
                </View>
                <View>
                  <Text
                    style={styles.normalText}
                  >{`${parkingListingData?.reviews.length.toString()} reviews`}</Text>
                </View>
              </View>
            </View>
            <View style={styles.separator}></View>
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ marginRight: 10 }}>
                <Image
                  style={{ width: 48, height: 48 }} // Ensure the image fits inside
                  resizeMode="contain"
                  source={require("../../assets/icons8-circled-user-male-skin-type-4-48.png")}
                />
              </View>
              <View>
                <Text>{`Hosted by ${parkingListingData?.host.name}`}</Text>
                <Text>{`${parkingListingData?.host.years_hosting} years hosting`}</Text>
              </View>
            </View>
            <View style={styles.separator}></View>
            <View
              style={{
                padding: 20,
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text style={styles.headlineText}>About the spot</Text>
              <Text
                onTextLayout={handleTextLayout}
                numberOfLines={isTextExpanded ? undefined : 6}
                ellipsizeMode="tail"
              >
                {parkingListingData?.description}
              </Text>
              {isTruncated && !isTextExpanded && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setIsTextExpanded(true)}
                >
                  <Text style={styles.buttonText}>Show more</Text>
                </TouchableOpacity>
              )}
              {isTextExpanded && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setIsTextExpanded(false)}
                >
                  <Text style={styles.buttonText}>Show less</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.separator}></View>
          </View>
          <View style={styles.amenitiesContainer}>
            <Text style={styles.headlineText}>What this spot offers</Text>
            {parkingListingData?.amenities.map((amenity, index) => (
              <Text
                style={{ fontSize: 16, padding: 5 }}
                key={`amenity-${index}`}
              >
                {amenity}
              </Text>
            ))}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Text
            style={(styles.normalText, { alignSelf: "center" })}
          >{`$${parkingListingData?.price_per_hour} per hour`}</Text>
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() => onPressReserve()}
          >
            <Text style={styles.reserveButtonText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};
