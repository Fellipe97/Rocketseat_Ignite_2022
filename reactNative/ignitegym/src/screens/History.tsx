import { useState } from "react"
import { Center, Heading, Text, VStack, SectionList } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";

export function History(){
    const [exercise, setExercise] = useState([
        {
            title: '26.08.22',
            data: ['Puxada frontal', 'Remada unilateral']
        },
        {
            title: '27.08.22',
            data: ['Puxada frontal']
        },
    ])

    return(
        <VStack flex={1}>
            <ScreenHeader
                title="Hitorico de exercicio"
            />
            <SectionList 
                sections={exercise}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <HistoryCard />
                )}
                renderSectionHeader={({section}) => (
                    <Heading color='gray.200' fontSize='md' mt={10} mb={3} fontFamily='heading'>
                        {section.title}
                    </Heading>
                )}
                px={8}
                contentContainerStyle={exercise.length === 0 && {flex: 1, justifyContent: 'center'}}
                ListEmptyComponent={() => (
                    <Text color={"gray.100"} textAlign='center'>
                        Não há exercícios registrados ainda.{'\n'}
                        Vamos fazer exercícios hoje?
                    </Text>
                )}
                showsVerticalScrollIndicator={false}
            />
        </VStack>
    );
}