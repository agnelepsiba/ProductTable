import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store'; // Adjust the path as needed
import { setProductList, setSearchProducts, setSelectedProduct, setProductReviews } from '../../redux/productSlice'; // Adjust the path as needed
import styles from './product.module.scss';
import axios from 'axios';
import { Col, Pagination, Rate, Row, Modal } from 'antd';
import IfEmptyContent from '../../shared/widgets/ifEmptyContent';
import empty from "../../styles/images/empty-folder.png";

interface Review {
  rating: number;
  comment: string;
}


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  reviews?: Review[];
}

export default function ProductMain(props: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { productList, searchProducts, selectedProduct, productReviews } = useSelector((state: RootState) => state.products);
  const searchData: any = props;

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productList.slice(indexOfFirstItem, indexOfLastItem);

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (searchData?.trim !== '') {
      axios.get(`https://dummyjson.com/products/search?q=${searchData?.searchData}`).then((res) => {
        dispatch(setProductList(res?.data.products));
      });
    } else {
      dispatch(setProductList(searchProducts));
    }
  }, [searchData, searchProducts, dispatch]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products').then((res) => {
      dispatch(setProductList(res?.data.products));
    });
    axios.get('https://dummyjson.com/products/categories').then((response: any) => {
      dispatch(setSearchProducts(response?.data));
    });
  }, [dispatch]);

  const handleView = async (productId: number) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${productId}`);
      dispatch(setSelectedProduct(response.data));
      dispatch(setProductReviews(response.data.reviews || []));
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching product details", error);
    }
  };

  return (
    <div className="noFluid">
      <Row className={styles.productRow} gutter={[24, 24]}>
        {currentItems?.length > 0 ? currentItems?.map((list: Product) => (
          <Col sm={6} key={list.id}>
            <div className={styles.productDiv}>
              <img src={list.thumbnail} alt="product image" />
              <div className={styles.prdDetails}>
                <h6>{list?.title}</h6>
                <p className={styles.desc}>
                  {list?.description}
                </p>
                <p className={styles.price}>${list?.price}</p>
                <button className={styles.buttonViewReviews} onClick={() => handleView(list.id)}>View Reviews</button>
              </div>
            </div>
          </Col>
        )) : <IfEmptyContent image={empty} title="Sorry No Product Found" />}
      </Row>

      <Row justify="end">
        <Pagination
          current={currentPage}
          total={productList.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
        />
      </Row>

      {selectedProduct && (
        <Modal
          title={`Reviews for ${selectedProduct.title}`}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          {productReviews.length > 0 ? (
            productReviews.map((review, index) => (
              <div key={index}>
                <Rate allowHalf defaultValue={review.rating} disabled />
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews available for this product.</p>
          )}
        </Modal>
      )}
    </div>
  );
}
