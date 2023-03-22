import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { Text, View, Image, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Task } from "../../components/Task";

type TaskType = {
    name: string;
    checked: boolean;
}


export function Home () {
    const [tasks, setTasks] = useState<TaskType[]>([])
    const [taskName, setTaskName] = useState('')
    const [countTask, setCountTask] = useState(0)
    const [countTaskDone, setCountTaskDone] = useState(0)

    const [pressInput, setPressInput] = useState(false)
    const [colorBorder, setColorBorder] = useState('black')

    useEffect(()=>{
        setColorBorder(pressInput===false ? "black" : "#5E60CE")
    },[pressInput])

    const handleTaskAdd = () => {
        let exit = 0

        if( taskName.replace(/\s/g, '') === ''){
            setTaskName('')
            return 
        }
        tasks.map(item => {
            if(item.name === taskName){
                exit = 1
                return
            }
        })
        if(exit === 1){
            return Alert.alert("Tarefa existente","Já existe essa tarefa.")
        }

        const newTask = {
            name: taskName,
            checked: false
        }
        setTasks( prevState => [...prevState, newTask] ) 
        setCountTask( countTask+1 ) 
        setTaskName('')
    }

    const handleTaskRemove = (name:string) =>{
        Alert.alert("Remover",`Deseja remover ${name}?`,[
            {
                text:'Sim',
                onPress: () => {
                    let done = 0
                    tasks.map(item => {
                        if(item.name === name){
                            if(item.checked === true){
                                done = -1
                            }
                        }
                    })
                    setCountTaskDone(countTaskDone+done)
                    setCountTask(countTask-1)
                    setTasks( prevState => prevState.filter(task => task.name !== name) ) 
                }
            },
            {
                text:'Não',
                style:'cancel'
            }
        ])
    }

    const handleTaskChecked = (name:string) =>{

        let done = 0
        tasks.map(item => {
            if(item.name === name){
                if(item.checked === false){
                    done = 1
                }else{
                    done = -1
                }
            }
        })

        setTasks( prevState => prevState.map( item => item.name === name ? {
            ...item,
            checked: !item.checked
        }:item) )

        setCountTaskDone(countTaskDone+done)
    }


    return(
        <View style={styles(colorBorder).container}>

            <View style={styles(colorBorder).header}>
                <View style={styles(colorBorder).boxText}>
                    {/*
                        <Ionicons name="md-rocket-outline" size={24} color="#4EA8DE" />
                    */}
                    <Image
                        source={require('../../../assets/rocket2.png')}
                        fadeDuration={0}
                        style={styles(colorBorder).imgStyle}
                    />

                    <Text style={styles(colorBorder).textLogo1}>
                        to
                    </Text>
                    <Text style={styles(colorBorder).textLogo2}>
                        do
                    </Text>
                </View>
            </View>

            <View style={styles(colorBorder).formStyle}>
                <TextInput 
                    //style={styles.inputStyles}
                    style={styles(colorBorder).inputStyles}
                    placeholder="Adicione uma nova tarefa"
                    placeholderTextColor={'#6b6b6b'}
                    value={taskName}
                    onChangeText={setTaskName}
                    onFocus={ () => setPressInput(true)}
                    onBlur={() => setPressInput(false)}
                />
                <TouchableOpacity style={styles(colorBorder).button} onPress={handleTaskAdd}>
                    <Image
                        source={require('../../../assets/add_circle.png')}
                        fadeDuration={0}
                        style={styles(colorBorder).imgStyle2}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles(colorBorder).boxCount}>
                <View style={styles(colorBorder).item}>
                    <Text style={styles(colorBorder).titlesLikes}>
                        Criadas
                    </Text>
                    <Text style={styles(colorBorder).countTitlesLikes}>
                        {countTask}
                    </Text>
                </View>

                <View style={styles(colorBorder).item}>
                    <Text style={styles(colorBorder).titlesDone}>
                        Concluídas
                    </Text>
                    <Text style={styles(colorBorder).countTitlesDone}>
                        {countTaskDone}
                    </Text>
                </View>
            </View>


            <FlatList 
                data={tasks}
                keyExtractor={ item => item.name }
                renderItem={({item}) => (
                    <View style={{marginHorizontal:30}}>
                        <Task 
                            key = {item.name}
                            task= {item} 
                            onRemove={() => handleTaskRemove(item.name)}
                            onChecked={() => handleTaskChecked(item.name)}
                        />
                    </View>
                   
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={()=>(
                    <>
                        <View style={{paddingLeft:30,paddingRight:30}}>
                            <View style={styles(colorBorder).lineStyle}/>
                        </View>
                        <View style={styles(colorBorder).boxListEmpty}>
                            <View style={styles(colorBorder).lineStyle}/>
                            {/* <MaterialCommunityIcons name="clipboard-text-outline" size={150} color="black" /> */}
                            <Ionicons name="clipboard-outline" size={150} color="#575757" />
                            <Text 
                                style={styles(colorBorder).listEmptyText1}>
                                Você ainda não tem tarefas cadastradas
                            </Text>
                            <Text 
                                style={styles(colorBorder).listEmptyText2}>
                                Crie tarefas e organize seus itens a fazer
                            </Text>
                        </View>
                    </>
                )}
            />
        </View>
    )
}