# Typescript Tricks

## How to define the type prop when creating a style component?
  ```
  interface TitleProps {
    readonly isActive: boolean;
  };

  const Title = styled.h1<TitleProps>`
    color: ${props => props.isActive ? props.theme.colors.main : props.theme.colors.secondary};
  `
  ```
