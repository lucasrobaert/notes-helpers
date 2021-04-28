import { InferGetStaticPropsType } from 'next'
import Main from 'components/Main'
import { getAllNotesData, NoteProps } from 'lib/note'

export default function Home({
  notes
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <Main notes={notes} />
}

export const getStaticProps = async () => {
  const notes: NoteProps[] = getAllNotesData()

  return {
    props: {
      notes
    }
  }
}
