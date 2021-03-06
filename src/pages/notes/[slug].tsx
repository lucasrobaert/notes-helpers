import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { Container } from 'components/Container'
import { getAllNotesIds, getNoteData } from 'lib/note'

import { ArrowBack, ContentCopy, Done } from '@styled-icons/material-outlined'
import * as S from 'styles/note-styles'

type PostDataProps = {
  postData: {
    title: string
    contentHtml: string
  }
}

type ParamsProps = {
  params: {
    slug: string
  }
}

const Note = ({ postData }: PostDataProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(location.href)
      setCopied(true)
      /** After 10 seconds, allow to copy again */
      setTimeout(() => setCopied(false), 10000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }
  return (
    <S.Wrapper>
      <Link href="/">
        <S.TitleLogo>Notes and Helpers</S.TitleLogo>
      </Link>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Container>
        <motion.div
          initial={{ transform: 'translateY(100%)' }}
          animate={{ transform: 'translateY(0px)' }}
          exit={{ transform: 'translateY(100%)' }}
        >
          <S.ArticleWrapper>
            <S.Header>
              <Link href="/">
                <S.BackLink>
                  <ArrowBack size={25} aria-label="voltar" />
                  Voltar
                </S.BackLink>
              </Link>
              <S.CopyWrapper onClick={handleCopyUrl} role="button">
                {copied ? (
                  <Done size={25} title="Link Copiado!" />
                ) : (
                  <ContentCopy size={25} aria-label="Copiar Link" />
                )}
              </S.CopyWrapper>
            </S.Header>

            <S.Title>{postData.title}</S.Title>
            <S.Content
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />
          </S.ArticleWrapper>
        </motion.div>
      </Container>
    </S.Wrapper>
  )
}

export async function getStaticPaths() {
  const paths = getAllNotesIds()

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: ParamsProps) {
  const postData = await getNoteData(params.slug)

  return {
    props: {
      postData
    }
  }
}

export default Note
