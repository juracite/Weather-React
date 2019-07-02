import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapView } from "expo";
import { SearchBar } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { connect } from "react-redux";
import { getCurrentWeatherByCity } from "../actions";
import WeatherCard from "../components/weather-card";

const DEFAULT_COORD = {
  lat: 48.859268,
  lng: 2.34706
};

class SearchScreen extends React.Component {
  state = { search: "" };
  updateSearch = search => {
    this.setState({ search });
  };
  submitSearch = () => {
    this.props.getCurrentWeatherByCity(this.state.search);
    console.log(this.state.search);
  };

  render() {
    console.log(this.props.currentWeather);
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: this.props.currentWeather
              ? this.props.currentWeather.coord.lat
              : DEFAULT_COORD.lat,
            longitude: this.props.currentWeather
              ? this.props.currentWeather.coord.lon
              : DEFAULT_COORD.lng,
            latitudeDelta: 0.2,
            longitudeDelta: 0.1
          }}
          scrollEnabled={false}
          liteMode={true}
        />
        {this.props.currentWeather && (
          <WeatherCard currentWeather={this.props.currentWeather} />
        )}
        <SearchBar
          lightTheme
          onChangeText={this.updateSearch}
          value={this.state.search}
          onSubmitEditing={this.submitSearch}
          placeholder="Type your city..."
          containerStyle={{
            position: "absolute",
            bottom: hp("50%"),
            left: wp("5%"),
            width: wp("90%")
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = store => {
  return {
    currentWeather: store.weather.currentWeather
  };
};

const mapDispatchToProps = {
  getCurrentWeatherByCity
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
