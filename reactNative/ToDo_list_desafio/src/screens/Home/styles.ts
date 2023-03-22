import { StyleSheet } from "react-native";


export const styles = (colorBorder:string) => StyleSheet.create({
    header:{
        backgroundColor:"black",
        height: "30%",
        justifyContent:"center"
    },
    boxText:{
        flexDirection:"row",
        justifyContent:"center"
    },
    imgStyle:{
        tintColor: "#4EA8DE",
        width: 50, 
        height: 50,
        marginRight: 5
    },
    textLogo1:{
        fontSize: 32,
        color: "#4EA8DE",
        fontWeight:"bold",
        fontFamily: 'Roboto'
    },
    textLogo2:{
        fontSize: 32,
        color: "#5E60CE",
        fontWeight:"bold"
    },
    container: {
        flex:1,
        backgroundColor:"#191919",
    },

    //Adicionar tarefa
    formStyle:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop: -30,
        alignItems:"center"
    },
    button:{
        backgroundColor:"#1E6F9F",
        borderRadius:5,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: 'center'
    },
    inputStyles:{
        backgroundColor: '#262626',
        borderRadius: 5,
        padding: 10,
        width: 300,
        color: "#fff",
        marginRight: 5,
        borderWidth: 1,
        borderColor: colorBorder
    },
    imgStyle2:{
        tintColor: "#fff",
        width: 25, 
        height: 25
    },

    //Contadores e linha
    boxCount:{
        flexDirection: 'row',
        justifyContent:"space-between",
        padding: 30
        //backgroundColor:"yellow"
    },
    item:{
        flexDirection:"row"
    },
    titlesLikes:{
        marginRight:10,
        fontSize:18,
        color: '#4EA8DE',
        fontWeight: "bold"
    },
    countTitlesLikes:{
        fontSize:16,
        backgroundColor:"#333333",
        paddingHorizontal:10,
        borderRadius: 10,
        fontWeight: "bold",
        color: "#fff"
    },
    titlesDone:{
        marginRight:10,
        fontSize:18,
        color: '#5E60CE',
        fontWeight: "bold"
    },
    countTitlesDone:{
        fontSize:16,
        backgroundColor:"#333333",
        paddingHorizontal:10,
        borderRadius: 10,
        fontWeight: "bold",
        color: "#fff"
    },
    lineStyle:{
        height: 2, 
        backgroundColor:"#333333"
    },


    //Lista to do 
    listTodoStyle:{

    },
    boxListEmpty:{
        //backgroundColor:"yellow",
        alignItems: "center",
        marginTop: 30
    },
    listEmptyText1:{
        fontWeight:"bold",
        fontSize: 18,
        color: "#808080"
    },
    listEmptyText2:{
        fontSize: 16,
        color: "#808080"
    }
})