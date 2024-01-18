import { useCallback, useState } from "react"
import { useFocusEffect } from "@react-navigation/native";
import { Center, Heading, Text, VStack, SectionList, useToast } from "native-base";

import { api } from "@services/api";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
import { AppError } from "@utils/AppError";

export function History() {
    const toast = useToast();
    const [isLoading, setIsloading] = useState(true);
    const [exercise, setExercise] = useState<HistoryByDayDTO[]>([])


    async function fetchHistory() {
        try {
            setIsloading(true);
            const response = await api.get('/history');
            console.log(response.data)
            setExercise(response.data)

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar o hitórico.';
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });
        } finally {
            setIsloading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchHistory();
    }, []))

    return (
        <VStack flex={1}>
            <ScreenHeader
                title="Hitorico de exercicio"
            />
            <SectionList
                sections={exercise}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <HistoryCard data={item} /> }
                renderSectionHeader={({ section }) => (
                    <Heading color='gray.200' fontSize='md' mt={10} mb={3} fontFamily='heading'>
                        {section.title}
                    </Heading>
                )}
                px={8}
                contentContainerStyle={exercise.length === 0 && { flex: 1, justifyContent: 'center' }}
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