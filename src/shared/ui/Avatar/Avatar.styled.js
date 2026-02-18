import styled from "styled-components";
import { Link } from "react-router-dom";

export const AvatarWrapper = styled(Link)`
  display: flex;
  padding: 4px;
`;

export const AvatarImage = styled.img`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: 50%;
  object-fit: cover;
`;

export const AvatarPlaceholder = styled.div`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => Math.floor(props.$size * 0.4)}px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
`;
