import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { 
    Container
} from './styles';

export function Groups() {
  return (
    <Container>
      <Header/>
      <Highlight tittle='Turmas' subtittle='jogue com a sua turma'/>
      <GroupCard title='Galera do Ignite'/>
    </Container>
  );
}