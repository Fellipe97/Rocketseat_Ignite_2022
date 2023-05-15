import { useState } from 'react';

import { useNavigation } from '@react-navigation/native'
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'
import { Input } from '@components/Input';
import { Button } from '@components/Button';


type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
    password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
    password_confirm: yup.string().required('Confirme a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.').oneOf([yup.ref('password'), ''], 'A confirmação da senha não confere')
});


export function SignUp() {
    const navigation = useNavigation();


    /* const { control, handleSubmit } = useForm<FormDataProps>({
        defaultValues:  {
            name: 'Fellipe'
        },
    }); */
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    function handleGoBack() {
        navigation.goBack();
    }

    function handleSingnUp({ name, email, password, password_confirm }: FormDataProps) {

    }


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={10} pb={16}>
                <Center my={24}>
                    <Image
                        source={BackgroundImg}
                        defaultSource={BackgroundImg}
                        alt='Pessoas treinando'
                        resizeMode='contain'
                        position={'absolute'}
                    />
                    <LogoSvg />
                    <Text color="gray.100" fontSize='sm'>
                        Treine sua mente e seu corpo
                    </Text>
                </Center>
                <Center>
                    <Heading color="gray.100" fontSize='xl' mb={6} fontFamily="heading">
                        Crie a sua conta
                    </Heading>

                    <Controller
                        control={control}
                        name='name'
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder='Nome'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />

                    {/* <Text color='white'>
                        {errors.name?.message}
                    </Text> */}

                    <Controller
                        control={control}
                        name='email'
                        /* rules={{
                            required: 'Informe o e-mail.',
                            pattern: {
                                value: /^[A-zIndex: 0-9,_%+-]+@[A-Z0-9.-]+\[A-Z]{2,}$/i,
                                message: 'E-mail inválido'
                            }
                        }} */
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder='E-mail'
                                keyboardType='email-address'
                                autoCapitalize='none'
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name='password'
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder='Senha'
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='password_confirm'
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder='Cinfirar a Senha'
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                onSubmitEditing={handleSubmit(handleSingnUp)}
                                returnKeyType='send'
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Button
                        title='Criar e acessar'
                        onPress={handleSubmit(handleSingnUp)}
                    />
                </Center>


                <Button
                    title='Voltar para o login'
                    variant="outline"
                    mt={12}
                    onPress={handleGoBack}
                />


            </VStack>
        </ScrollView>
    );
}