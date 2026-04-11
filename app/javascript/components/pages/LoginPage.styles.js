import styled from "styled-components";

export const PageWrapper = styled.div`
  max-width: 420px;
  margin: 60px auto;
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: #fff;
`;

export const BrandTitle = styled.h2`
  color: #702082;
`;

export const Subtitle = styled.p`
  color: #666;
  margin-bottom: 20px;
`;

export const FormLabel = styled.div`
  text-align: left;
  font-size: 0.85rem;
  font-weight: bold;
  margin-top: ${(props) => (props.withTopSpace ? "10px" : "0")};
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${(props) => (props.variant === "secondary" ? "#8f4aa3" : "#702082")};
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  margin-top: ${(props) => (props.compact ? "4px" : "15px")};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ToggleRow = styled.div`
  margin-top: 12px;
  font-size: 0.9rem;
`;

export const TextButton = styled.button`
  background: none;
  border: none;
  color: #702082;
  cursor: pointer;
  font-weight: bold;
  padding: 0;
`;

export const ResetPanel = styled.div`
  margin-top: 18px;
  text-align: left;
  background: #faf6fc;
  border: 1px solid #e5d8eb;
  border-radius: 10px;
  padding: 14px;
`;

export const ResetTitle = styled.h3`
  margin: 0 0 8px 0;
  color: #4d165a;
`;

export const ResetDescription = styled.p`
  margin: 0 0 12px 0;
  color: #555;
  font-size: 0.85rem;
`;

export const InlineForm = styled.form`
  margin-top: ${(props) => (props.withTopSpace ? "12px" : "0")};
`;

export const HelperText = styled.p`
  color: ${(props) => (props.error ? "#b3261e" : "#137333")};
  margin-top: 10px;
  font-size: 0.85rem;
`;

export const FooterRow = styled.div`
  margin-top: 20px;
  font-size: 0.9rem;
`;

export const RegisterLink = styled.a`
  color: #e60000;
  text-decoration: none;
  font-weight: bold;
`;
