import {
  Search as IconSearch,
  QuestionAnswer
} from '@styled-icons/material-outlined'
import GithubCorner from 'react-github-corner'

import { NoteProps } from 'lib/note'

import Search from 'components/Search'
import Heading from 'components/Heading'
import MediaMatch from 'components/MediaMatch'

import * as S from './styles'

type MainProps = {
  notes?: NoteProps[]
}

const Main = ({ notes = [] }: MainProps) => {
  return (
    <S.Wrapper>
      <S.LogoWrapper>
        <S.Title>Notes and Helpers</S.Title>
      </S.LogoWrapper>
      <S.Hero>
        <S.Description>
          <Heading>
            Dúvidas e erros frequentes pelos quais já passei na vida, ou
            curiosidades
          </Heading>
        </S.Description>
      </S.Hero>
      <S.InputWrapper>
        <Search
          aria-label="Procure entre perguntas mais frequentes"
          placeholder="Pesquisar"
          icon={<IconSearch />}
          notes={notes}
        />
      </S.InputWrapper>
      <GithubCorner
        bannerColor="#F231A5"
        href="https://github.com/lucasrobaert/notes-helpers"
      />
    </S.Wrapper>
  )
}

export default Main
