import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
`;

export const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

export const AuthorName = styled.span`
  color: #e7e7e7;
  font-weight: 700;
  font-size: 15px;
`;

export const Text = styled.p`
  color: #e7e7e7;
  margin: 0;
  font-size: 15px;
`;
