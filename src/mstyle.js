import { StyleSheet } from "react-native";
import { Colors, Fonts } from "./contants";
import { Display } from "./utils";


export default mstyle = StyleSheet.create({
  container: {
    paddingTop:15,
      flex: 1,
      backgroundColor: Colors.DEFAULT_WHITE,
    },
    container1: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
      },
      headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        lineHeight: 20 * 1.4,
        width: Display.setWidth(80),
        textAlign: 'center',
      },
      title: {
        color: 'Balck',
        // textAlign: "center",
        fontSize: 16,
        borderBottomColor:'silver',
        borderBottomWidth:1,
        fontFamily: Fonts.POPPINS_MEDIUM,
        fontWeight: "bold",
        lineHeight: 16 * 1.4,
        marginTop: 20,
        // marginBottom: 10,
        marginHorizontal: 20,
        paddingBottom:5
      },
    content: {
    textAlign: "left",
    fontSize: 14,
    fontWeight:'semibold',
    fontFamily: Fonts.POPPINS_MEDIUM,
    color:'gray',
    // marginTop: 5,
    marginBottom: 7,
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY2,
    paddingHorizontal: 7,
    marginHorizontal: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    justifyContent: 'center',
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 14,
    textAlignVertical: 'center',
    paddingVertical:10,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
  PrimaryButton: {
    backgroundColor: Colors.DARK_ONE,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  PrimaryButtonText: {
    fontSize: 14,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },

  //For cards
  ListContainer: {
    backgroundColor: 'white',
    // borderColor: 'silver',
    // borderWidth: 1,
    borderBottomColor: Colors.SECONDARY_WHITE,
    borderBottomWidth:1,
    paddingHorizontal: 7,
    paddingVertical:14,
    borderRadius: 4,
    flexDirection: 'row',
    marginHorizontal: 7,
    marginVertical: 2,
    elevation:2
   

  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    // width: '55%',
  },

  listListTitle: {
    color: 'black',
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.1,
    // width: '100%',
  },
  titleContainer: {
    // flexDirection: 'column',
    // width: '10%',
  }

})