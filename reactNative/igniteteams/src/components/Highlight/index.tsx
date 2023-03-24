import { 
    Container,
    Title,
    Subtitle 
} from "./styles";


type Props = {
    tittle: string;
    subtittle: string;
}

export function Highlight ({tittle,subtittle}:Props){
    return(
        <Container>
            <Title>{tittle}</Title>
            <Subtitle>{subtittle}</Subtitle>
        </Container>
    );
}