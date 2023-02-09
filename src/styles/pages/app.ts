import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  minHeight: '100vh',
  justifyContent: 'center',
  padding: '0 2rem',
})

export const Header = styled('header', {
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  justifyContent: 'space-between',
})
