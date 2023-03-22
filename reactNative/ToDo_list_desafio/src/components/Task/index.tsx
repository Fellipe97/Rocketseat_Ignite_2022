import React from "react";
import { styles } from "./styles";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { CheckBox } from 'react-native-elements';
/* import {Checkbox} from 'react-native' */


type Props = {
    task: {
        name: string;
        checked: boolean;
    };
    onRemove: () => void;
    onChecked: () => void;
}

export const Task = ({task, onRemove, onChecked}: Props) => {

    return(
        <View style={styles.container}>
            <TouchableOpacity style={{flexDirection:"row", alignItems: "center"}} onPress={onChecked}>
                <CheckBox
                    checkedIcon="check"
                    uncheckedIcon="square-o"
                    checkedColor="green"
                    uncheckedColor="#1E6F9F"
                    checked={task.checked}
                    onPress={onChecked}
                />
                
                {task.checked === true &&
                    <Text style={{fontSize: 16,color:"#808080", textDecorationLine:"line-through",flexWrap:"wrap", width:225}}>
                        { task.name }
                    </Text>
                }
                {task.checked === false &&
                    <Text style={{fontSize: 16,color:"#fff",flexWrap:"wrap", width:225}}>
                        { task.name }
                    </Text>
                }

            </TouchableOpacity>
            <TouchableOpacity onPress={onRemove}>
                <Image
                    source={require('../../../assets/delete.png')}
                    fadeDuration={0}
                    style={styles.deleteStyle}
                />
            </TouchableOpacity>


        </View>
    )
}