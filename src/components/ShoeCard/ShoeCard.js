import React from 'react';
import styled, { css } from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          {variant === 'on-sale' && (
            <OnSaleRibbon>
              Sale
            </OnSaleRibbon>
          )}
          {variant === 'new-release' && (
            <JustReleasedRibbon>
              Just Released!
            </JustReleasedRibbon>
          )}
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price variant={variant}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' && (<SalePrice>{formatPrice(salePrice)}</SalePrice>)}
        </Row>
      </Wrapper>
    </Link>
  );
};

const BaseRibbon = styled.span`
  position: absolute;
  top: 12px;
  right: -4px;

  border-radius: 2px;
  font-size: 14px;
  font-weight: ${WEIGHTS.medium};
  padding: 12px;
`

const JustReleasedRibbon = styled(BaseRibbon)`
  background-color: ${COLORS.secondary};
  color: ${COLORS.white};
`

const OnSaleRibbon = styled(BaseRibbon)`
  background-color: ${COLORS.primary};
  color: ${COLORS.white};
`

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`

`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  ${({ variant }) => css`
    color: ${variant === 'on-sale' ? COLORS.gray[700] : COLORS.gray[900]};
    text-decoration: ${variant === 'on-sale' && 'line-through'};
  `
  }
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
