import styled from "styled-components";
export const Favorites = styled.div`
max-width:600px;
margin: 0 auto;
`
export const FavoriteWrapper = styled.div`
border: ${({ noBorder }) => 
    noBorder ? "none" : "1px solid #2f3336"}
`
export const SaveWrapper = styled(FavoriteWrapper)`
display:flex;
flex-direction:column;
align-items:flex-start;
border:none;
`
export const TitleSave = styled.h1`
font-size: 28px;        
  font-weight: 700;    
  line-height: 1.2;
  color: #ffffff;         
  margin: 0 0 8px 0;
  `
export const TextSave = styled.p`
font-size: 15px;        
  font-weight: 400;
  line-height: 1.5;
  color: #71767b;       
  margin: 0;
`