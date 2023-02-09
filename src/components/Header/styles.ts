import { keyframes, styled } from '../../styles/index'
import * as Dialog from '@radix-ui/react-dialog'

const fadeIn = keyframes({
  '0%': {
    boxShadow: 'none',
    transform: 'translateX(100%)',
  },

  '100%': {
    boxShadow:
      'rgba(0, 0, 0, 0.25) -10px 0px 50px, rgba(0, 0, 0, 0.25) -10px 0px 50px;',

    transform: 'translateX(0%)',
  },
})

const fadeOut = keyframes({
  '0%': {
    boxShadow:
      'rgba(0, 0, 0, 0.25) -10px 0px 50px, rgba(0, 0, 0, 0.25) -10px 0px 50px;',
    transform: 'translateX(0%)',
  },
  '100%': {
    boxShadow: 'none',
    transform: 'translateX(100%)',
  },
})

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  button: {
    position: 'relative',
    padding: '0.75rem',
    border: 0,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',

    color: '$white',
    background: '$gray800',
    transition: 'background 0.2s',

    '&:hover': {
      background: '$green500',
    },

    svg: {
      display: 'flex',
      lineHeight: 0,
    },
  },

  div: {
    width: '1.75rem',
    height: '1.75rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    left: '60%',
    bottom: '60%',
    border: '3px solid $gray900',
    backgroundColor: '$green300',
    borderRadius: 9999,

    span: {
      color: '$white',
      fontSize: '$small',
      fontWeight: 'bold',
    },
  },
})

export const ItemsContainer = styled('div', {
  marginTop: '2rem',
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
})

export const Item = styled('div', {
  width: '100%',
  display: 'flex',
  gap: '1rem',
  alignItems: 'flex-start',
})

export const ImageContainer = styled('div', {
  width: 100,
  height: 'auto',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const ProductDetails = styled('div', {
  wordBreak: 'break-word',
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'space-between',

  h3: {
    fontWeight: 'normal',
    color: '$gray300',
    fontSize: '$lg',
  },

  span: {
    fontWeight: 'bold',
    fontSize: '$xl',
    color: '$white',
  },

  button: {
    background: 'transparent',
    color: '$green500',
    border: 0,
    fontWeight: 'bold',
    fontSize: '$lg',
    cursor: 'pointer',
    transition: 'all 0.3s',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
})

export const Content = styled(Dialog.Content, {
  overflowY: 'auto',
  'scrollbar-width': 'auto',
  opacity: 0.98,
  '&[data-state="open"]': {
    animation: `${fadeIn} 0.5s cubic-bezier(0.77,0,0.18,1) forwards`,
  },
  '&[data-state="closed"]': {
    animation: `${fadeOut} 0.5s cubic-bezier(0.77,0,0.18,1) forwards`,
  },
  width: '30rem',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '4.5rem 3rem 3rem',
  background: '$gray800',
  position: 'fixed',
  top: 0,
  right: 0,
  header: {
    color: '$white',
  },

  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    button: {
      marginTop: '3rem',
      cursor: 'pointer',
      color: '$white',
      fontSize: '$md',
      borderRadius: 8,
      border: 0,
      width: '100%',
      padding: '1.25rem 0',
      background: '$green500',
      transition: 'background 0.3s',

      '&:hover': {
        background: '$green300',
      },
    },
  },
})

const LineBase = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const Amount = styled(LineBase, {
  'span:first-child': {
    fontSize: '1rem',
  },

  'span:last-child': {
    fontSize: '$md',
  },
})

export const Total = styled(LineBase, {
  color: '$white',
  'strong:first-child': {
    fontSize: '$md',
  },

  'strong:last-child': {
    fontSize: '$xl',
  },
})

export const CloseButton = styled(Dialog.Close, {
  background: 'transparent',
  border: 0,
  position: 'absolute',
  top: '1.5rem',
  right: '1.5rem',
  color: '$gray300',
  cursor: 'pointer',
  lineHeight: 0,

  transition: 'color 0.2s',

  '&:hover': {
    color: '$gray100',
  },
})
