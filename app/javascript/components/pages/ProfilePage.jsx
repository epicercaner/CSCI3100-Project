import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { AiOutlineUser, AiOutlinePicture, AiOutlineEdit } from "react-icons/ai";
import { ConditionTag, StatusBadge, TimeTag } from "../../common/style";
import SortDropdown from "../common/SortDropDown";
import getTimesAgo from "../../common/getTimesAgo";
import { getProducts } from "../../common/productUtils";
import PaginButton from "../common/PaginationButton";

export default function ProfilePage({ currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [profileUser, setProfileUser] = useState(null);
  const [sellingProducts, setSellingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const sortOption = searchParams.get("sort_by") || "default";

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const [userRes, productsRes] = await Promise.all([
        axios.get(`/users/${id}`),
        getProducts({
          seller_id: id,
          page: currentPage,
          limit: 10,
          sort_by: sortOption
        })
      ]);

      setProfileUser(userRes.data);

      setSellingProducts(productsRes.data || []); 
      if (productsRes.pagination) {
        setTotalPages(productsRes.pagination.total_pages);
      }
    } catch (err) {
      console.error("Profile load error:", err);
      setError("Failed to load profile data.");
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchProfileData();
}, [id, currentPage, sortOption]);

  if (loading && !profileUser) return <LoadingText>Loading user profile...</LoadingText>;
  if (error) return <ErrorText>{error}</ErrorText>;
  if (!profileUser) return null;

  return (
    <PageContainer>
      <ProfileHeader>
        <AvatarCircle>
          {profileUser.profile_picture_url ? (
            <AvatarImage src={profileUser.profile_picture_url} alt={`${profileUser.name}'s Avatar`} />
          ) : (
            <AiOutlineUser size={64} color="#aaa" />
          )}
        </AvatarCircle>
        
        <UserInfo>
          <UserName>{profileUser.name}</UserName>
          <CampusAffiliation>
            <UserCollege>{profileUser.college || " "}</UserCollege>
            <Userhostel>{profileUser.hostel || " "}</Userhostel>
          </CampusAffiliation>
          {profileUser.bio && (
            <UserBio>{profileUser.bio}</UserBio>
          )}
        </UserInfo>
      </ProfileHeader>

      <SellingSection>
        <SectionHeader>
          <SectionTitle>Selling</SectionTitle>
          <SortDropdown />
        </SectionHeader>
        
        <ProductList>
          {sellingProducts.length === 0 ? (
            <EmptyMessage>This user has no items on sale yet.</EmptyMessage>
          ) : (
            sellingProducts.map((product) => {
              const isOwner = currentUser && Number(currentUser.id) === Number(product.seller_id);

              return (
                <ProductCard key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                  <ImageWrapper>
                    <TimeTag style={{ right: "auto", left: "8px" }}>{getTimesAgo(product.created_at)}</TimeTag>
                    {product.images && product.images.length > 0 ? (
                      <img src={product.images[0]} alt={product.name} />
                    ) : (
                      <NoImagePlaceholder>
                        <AiOutlinePicture size={32} color="#ccc" />
                      </NoImagePlaceholder>
                    )}
                  </ImageWrapper>

                  <MiddleColumn>
                    <TitleText>{product.name}</TitleText>
                    <TagRow>
                      <StatusBadge style= {{ borderRadius: '6px', fontSize: "inherit" }}$status={product.status}>
                        {product.status || "Available"}
                      </StatusBadge>
                      <ConditionTag style={{ fontSize: "inherit" }}>
                        {product.condition || "Not Specified"}
                      </ConditionTag>
                    </TagRow>
                    <DescriptionText>
                      {product.description || "No description provided."}
                    </DescriptionText>
                  </MiddleColumn>

                  <RightColumn>
                    <PriceText>${product.price} HKD</PriceText>
                    {isOwner && (
                      <EditButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/edit/${product.id}`);
                        }}
                      >
                        <AiOutlineEdit size={16} /> Edit
                      </EditButton>
                    )}
                  </RightColumn>

                </ProductCard>
              );
            })
          )}
        </ProductList>

        <PaginButton currentPage={currentPage} totalPages={totalPages} />
      </SellingSection>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 50px;
  color: #666;
  font-size: 1.1rem;
`;

const ErrorText = styled(LoadingText)`
  color: #dc3545;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 15px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
  margin-bottom: 40px;
`;

const AvatarCircle = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: #f5f5f5;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const UserName = styled.h2`
  margin: 0;
  font-size: 2rem;
  color: #111827;
`;

const CampusAffiliation = styled.div`
  display: flex;
  gap: 10px;
  color: #6b7280;
  font-size: 1rem;
  margin-top: 4px;
  margin-bottom: -10px;
`;

const UserCollege = styled.span`
  font-size: 1rem;
  color: #6b7280;
`;

const Userhostel = styled.span`
  font-size: 1rem;
  color: #6b7280;
`;

const UserBio = styled.p`
  margin: 0;
  margin-top: 5px;
  color: #4b5563;
  line-height: 1.5;
  max-width: 600px;
  overflow-wrap: break-word;
  text-align: left;
`;

const SellingSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;


const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: #111827;
`;

const EmptyMessage = styled.div`
  padding: 30px;
  text-align: center;
  color: #888;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductCard = styled.div`
  display: flex;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 16px;
  gap: 16px;
  background-color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  flex-shrink: 0;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #f3f4f6;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MiddleColumn = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
`;

const TitleText = styled.h4`
  margin: 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TagRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 0.8rem;
`;

const DescriptionText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.5;
  // min-height: 3em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: normal;
  overflow-wrap: break-word;
  white-space: normal;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  flex-shrink: 0;
  min-width: 110px;

  @media (max-width: 600px) {
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 10px;
  }
`;

const PriceText = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #dc2626;
`;

const EditButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #fff;
  color: #374151;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  

  &:hover {
    background-color: #f3f4f6;
  }
`;

const NoImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;