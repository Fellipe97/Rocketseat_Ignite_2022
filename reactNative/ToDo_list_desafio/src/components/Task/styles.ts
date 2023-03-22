import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    container:{
        width: '100%',
        backgroundColor:'#262626',
        minHeight: 80,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        borderWidth: 2,
        borderColor:"#333333",
        justifyContent:"space-between",
        alignContent:"center"
    },
    textStyle:{
        fontSize: 16,
        color:"#fff"
    },
    deleteStyle:{
        tintColor: "#808080",
        width: 25, 
        height: 25,
    }
})