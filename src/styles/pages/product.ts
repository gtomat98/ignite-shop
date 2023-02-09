import { keyframes, styled } from '..'

const loading = keyframes({
  '0%': {
    backgroundColor: 'hsl(240, 5.9%, 13.3%)',
  },
  '100%': {
    backgroundColor: 'hsl(240, 7%, 21%)',
  },
})

export const ProductContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'stretch',
  gap: '4rem',

  maxWidth: 1180,
  margin: '0 auto',
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 576,
  height: 656,
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
  display: 'flex',
  flexDirection: 'column',

  h1: {
    fontSize: '$2xl',
    color: '$gray300',
  },

  span: {
    marginTop: '1rem',
    display: 'block',
    fontSize: '$2xl',
    color: '$green300',
  },

  p: {
    marginTop: '2.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },

  button: {
    marginTop: 'auto',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
})

export const SkeletonImageContainer = styled('div', {
  width: 576,
  height: 656,
  background: '$gray800',
  borderRadius: 8,
  padding: '0.25rem',

  animation: `${loading} 1s linear infinite alternate`,
})

export const SkeletonProductDetails = styled('div', {
  '*': {
    animation: `${loading} 1s linear infinite alternate`,
  },
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  div: {
    background: '$gray800',
    borderRadius: 8,
  },
})

export const SkeletonTitle = styled('div', {
  width: '100%',
  padding: '1.1875rem',
})

export const SkeletonPrice = styled('div', {
  width: '30%',
  padding: '1.1875rem',
})

export const SkeletonDescription = styled('div', {
  marginTop: '2.5rem',
  width: '100%',
  padding: '7.5rem',
})

export const SkeletonButton = styled('div', {
  marginTop: 'auto',
  width: '100%',
  padding: '1.9375rem',
})
