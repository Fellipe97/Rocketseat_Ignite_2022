import { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from "native-base";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as ImagePicker from 'expo-image-picker';
import *  as FileSystem from 'expo-file-system';
import * as yup from 'yup';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

import { useAuth } from '@hooks/useAuth';

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from '@components/Input';
import { Button } from '@components/Button';

const PHOTO_SIZE = 33;

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    old_password: string;
    confirm_password: string;
}

const profileSchema = yup.object({
    name: yup
        .string()
        .required('Informe o nome.'),
    password: yup
        .string()
        .min(6, 'A senha deve ter pelo menos 6 dígitos.')
        .nullable()
        .transform((value) => !!value ? value : null),
    confirm_password: yup
        .string()
        .nullable()
        .transform((value) => !!value ? value : null)
        .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere')
        .when('password', {
            is: (Field: any) => Field,
            //then: yup.string().nullable().required('Informe a confirmação da senha.')
            then: (schema) => schema
                .nullable()
                .required('Informe a confirmação da senha.')
                .transform((value) => !!value ? value : null),
        })
});

export function Profile() {
    const [isUpdating, setIsUpdating] = useState(false);
    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    const [userPhoto, setUserPhoto] = useState('https://github.com/Fellipe97.png');

    const { user, updateUserProfile } = useAuth();
    const toast = useToast();
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email
        },
        resolver: yupResolver(profileSchema)
    });

    async function handleUserPhtotSelect() {
        setPhotoIsLoading(true)
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true
            });

            console.log(photoSelected)
            if (photoSelected.canceled) {
                return;
            }
            if (photoSelected.assets[0].uri) {
                let photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
                if (photoInfo.exists && photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
                    return toast.show({
                        title: 'Essa imagem é muito grande. Escolha uma até 5mb.',
                        placement: 'top',
                        bgColor: 'red.500'
                    })
                }



                //setUserPhoto(photoSelected.assets[0].uri)
                console.log(photoSelected.assets[0])
            }
        } catch (error) {
            console.log(error)
        } finally {
            setPhotoIsLoading(false)
        }


    }

    async function handleProfileUpdate(data: FormDataProps) {
        try {
            setIsUpdating(true);
            console.log(data)

            const userUpdated = user;
            userUpdated.name = data.name;

            await api.put('/users', data);

            await updateUserProfile(userUpdated);

            toast.show({
                title: 'Perfil atualizado com sucesso!',
                placement: 'top',
                bgColor: 'green.500'
            });

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            });

        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <VStack flex={1}>
            <ScreenHeader
                title="Profile"
            />
            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
                <Center mt={6} px={10}>
                    {photoIsLoading ?
                        <Skeleton
                            w={PHOTO_SIZE}
                            h={PHOTO_SIZE}
                            rounded='full'
                            startColor='gray.500'
                            endColor='gray.400'
                        />
                        :
                        <UserPhoto
                            source={{ uri: userPhoto }}
                            alt="Foto do suário"
                            size={PHOTO_SIZE}
                        />
                    }

                    <TouchableOpacity onPress={handleUserPhtotSelect}>
                        <Text color='green.500' fontWeight='bold' fontSize='md' mt={2} mb={8}>
                            Alterar foto
                        </Text>
                    </TouchableOpacity>

                    <Controller
                        control={control}
                        name='name'
                        render={({ field: { value, onChange } }) => (
                            <Input
                                bg='gray.600'
                                placeholder='Nome'
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='email'
                        render={({ field: { value, onChange } }) => (
                            <Input
                                bg='gray.600'
                                placeholder='E-mail'
                                value={value}
                                onChangeText={onChange}
                                isDisabled
                            />
                            /* errorMessage={errors.name?.message} */
                        )}
                    />

                    <Heading color='gray.200' fontSize='md' mb={2} alignSelf='flex-start' mt={12} fontFamily='heading'>
                        Alterar senha
                    </Heading>

                    <Controller
                        control={control}
                        name='old_password'
                        render={({ field: { onChange } }) => (
                            <Input
                                bg='gray.600'
                                placeholder='Senha Antiga'
                                secureTextEntry
                                onChangeText={onChange}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='password'
                        render={({ field: { onChange } }) => (
                            <Input
                                bg='gray.600'
                                placeholder='Nova senha'
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='confirm_password'
                        render={({ field: { onChange } }) => (
                            <Input
                                bg='gray.600'
                                placeholder='Confirme a nova senha'
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.confirm_password?.message}
                            />
                        )}
                    />



                    <Button
                        title='Atualizar'
                        mt={4}
                        onPress={handleSubmit(handleProfileUpdate)}
                        isLoading={isUpdating}
                    />

                </Center>
            </ScrollView>
        </VStack>
    );
}