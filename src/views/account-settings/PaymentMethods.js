// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Modal,
  Badge,
  Label,
  Input,
  Button,
  CardBody,
  CardTitle,
  ModalBody,
  CardHeader,
  InputGroup,
  ModalHeader,
  FormFeedback,
  InputGroupText,
  Spinner
} from "reactstrap";
import { useSkin } from "@hooks/useSkin";

// ** Third Party Components
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check, X } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import ComponentSpinner from "../../@core/components/spinner/Loading-spinner";

// ** Card Images
import jcbCC from "@src/assets/images/icons/payments/jcb-cc.png";
import visaIcon from "@src/assets/images/icons/payments/visa.png";
import amexCC from "@src/assets/images/icons/payments/amex-cc.png";
import uatpCC from "@src/assets/images/icons/payments/uatp-cc.png";
import visaCC from "@src/assets/images/icons/payments/visa-cc.png";
import dinersCC from "@src/assets/images/icons/payments/diners-cc.png";
import maestroCC from "@src/assets/images/icons/payments/maestro-cc.png";
import discoverCC from "@src/assets/images/icons/payments/discover-cc.png";
import mastercardIcon from "@src/assets/images/icons/payments/mastercard.png";
import mastercardCC from "@src/assets/images/icons/payments/mastercard-cc.png";

import "../../views/account-settings/billingTabContent.scss";
import { useDispatch, useSelector } from "react-redux";
import { addCard, defaultCard, deleteCard, getCard } from "../../redux/actions/cardAction";

const cardsObj = {
  jcb: jcbCC,
  uatp: uatpCC,
  visa: visaCC,
  amex: amexCC,
  diners: dinersCC,
  maestro: maestroCC,
  discover: discoverCC,
  mastercard: mastercardCC,
};

const data = [
  {
    cardCvc: "587",
    name: "Tom McBride",
    expiryDate: "12/24",
    imgAlt: "Mastercard",
    badgeColor: "primary",
    cardStatus: "Primary",
    cardNumber: "5577 0000 5577 9865",
    imgSrc: mastercardIcon,
  },
  {
    cardCvc: "681",
    imgAlt: "Visa card",
    expiryDate: "02/24",
    name: "Mildred Wagner",
    cardNumber: "4532 3616 2070 5678",
    imgSrc: visaIcon,
  },
];

const PaymentMethods = () => {
  const { skin, setSkin } = useSkin();
  const theming = `${skin === "dark" ? "#ffff" : "#177FFA"}`;
  const dispatch = useDispatch()
  // ** States
  const [show, setShow] = useState(false);
  const [loadingId, setLoadingId] = useState(null)
  const [cardType, setCardType] = useState("");
  const [selected, setSelected] = useState(null);
  const [modalCardType, setModalCardType] = useState("");
  const { cardData, cardDataLoading, cardDataError } = useSelector((state) => state.card)
  const { delCard, delCardLoading, delCardError } = useSelector((state) => state.card)
  const { addCardData, addCardLoading, addCardError } = useSelector((state) => state.card)
  const { defCard, defCardLoading } = useSelector((state) => state.card)

  useEffect(() => {
    dispatch(getCard())
  }, [])

  useEffect(() => {
    dispatch(getCard())
  }, [delCard, addCardData, defCard])


  // ** Hooks
  const {
    register,
    control,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { cardNumber: "", cardHolderName: "", expiryDate: "", cvc: "", futureBilling: true } });

  const onSubmit = (data) => {
    if (data.cardNumber.length <= 0) {
      setError("cardNumber", {
        type: "manual",
        message: "Please Enter Valid Card Number",
      });
    } else {
      let parts = data.expiryDate.split("/")
      let expiryMonthNo = parts[0]
      let expiryYear = parts[1]
      let formData = new FormData();
      formData.append('cardNumber', data.cardNumber)
      formData.append('cardHolderName', data.cardHolderName)
      formData.append('expiryMonthNo', expiryMonthNo)
      formData.append('expiryYear', expiryYear)
      formData.append('cvc', data.cvc)
      formData.append('futureBilling', data.futureBilling)
      dispatch(addCard(formData))
    }

  };

  const selectedCondition = selected !== null;

  const handleDeleteCard = (paymentMethodId) => {
    setLoadingId(paymentMethodId)
    dispatch(deleteCard(paymentMethodId))
  }

  return (
    <Fragment>
      <Card className="custom-card-5 dark-theme-custom-card-5 h-100 w-100" style={{ boxShadow: "none" }}>
        <CardHeader>
          <CardTitle tag="h4" style={{ color: `${theming}` }}>
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardBody className="my-1 py-25">
          <Row tag={Form}
            onSubmit={handleSubmit(onSubmit)} className="gx-4">
            <Col lg="6">
              <Row>
                <div
                  className="custom-card-5 dark-theme-custom-card-5 h-100">
                  <div className="d-flex mt-1 mb-1 gap-2 h-100">
                    {/* <div className="form-check"> */}

                    <CardHeader>
                      <CardTitle>
                        Credit/Debit/ATM Card
                      </CardTitle>
                    </CardHeader>
                  </div>
                  <div className="input-content mt-1">
                    <Col>
                      <InputGroup>
                        <Controller
                          id="cardNumber"
                          name="cardNumber"
                          control={control}
                          placeholder="1356 3215 6548 7898"
                          render={({ field }) => (
                            <Cleave
                              {...field}
                              name="cardNumber"
                              className={classnames(
                                "form-control input-child",
                                {
                                  "is-invalid": errors.cardNumber,
                                }
                              )}
                              options={{
                                creditCard: true,
                                onCreditCardTypeChanged: (type) =>
                                  setCardType(type),
                              }}
                            />
                          )}
                        />
                        {cardType !== "" && cardType !== "unknown" ? (
                          <InputGroupText className="position-absolute" style={{ zIndex: "100", right: "0", height: "100%", borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }}>
                            <img
                              height="24"
                              alt="card-type"
                              src={cardsObj[cardType]}
                            />
                          </InputGroupText>
                        ) : null}
                      </InputGroup>
                      {errors.cardInput ? (
                        <FormFeedback className="d-block">
                          {errors.cardInput.message}
                        </FormFeedback>
                      ) : null}
                    </Col>
                    <Row className="mt-3 justify-content-evenly gap-1 align-items-center">
                      <Col md={4} className="width-40-per p-0">
                        <Input
                          id="cardHolderName"
                          className="input-child"
                          placeholder="John Doe"
                          {...register("cardHolderName")}
                          onChange={(e) => setValue("cardHolderName", e.target.value)}
                        />
                      </Col>
                      <Col md={4} className="width-25-per p-0">
                        <Cleave
                          id="expiryDate"
                          placeholder="MM/YY"
                          {...register("expiryDate")}
                          onChange={(e) => setValue("expiryDate", e.target.value)}
                          className="form-control input-child"
                          options={{ delimiter: "/", blocks: [2, 2] }}
                        />
                      </Col>
                      <Col md={4} className="width-15-per p-0">
                        <Cleave
                          id="cvc"
                          placeholder="654"
                          {...register("cvc")}
                          className="form-control input-child"
                          options={{ blocks: [3] }}
                          onChange={(e) => setValue("cvc", e.target.value)}
                        />
                      </Col>
                    </Row>
                  </div>
                  <Col className="mt-3 mb-2">
                    <div className="d-flex align-items-center">
                      <div className="form-switch w-100">
                        <Input
                          defaultChecked
                          type="switch"
                          name="futureBilling"
                          id="futureBilling"
                          {...register("futureBilling")}
                          onCheck={(e) => setValue("futureBilling", e.target.checked)}
                        />
                        <Label className="form-check-label" for="futureBilling">
                          <span className="switch-icon-left">
                            <Check size={14} />
                          </span>
                          <span className="switch-icon-right">
                            <X size={14} />
                          </span>
                        </Label>
                        <Label
                          className="form-check-label fw-bolder ms-1"
                          for="futureBilling"
                        >
                          Save Card for future billing?
                        </Label>
                      </div>
                    </div>
                  </Col>
                </div>
              </Row>
            </Col>
            <Col
              lg="6"
            >
              {cardData?.data.length ? (
                <div className="custom-card-5 dark-theme-custom-card-5">
                  <CardHeader>
                    <CardTitle>
                      My Cards
                    </CardTitle>
                  </CardHeader>
                  <div className="added-cards">
                    {defCardLoading !== 'idle' || cardDataLoading !== 'idle' ? (
                      <CardBody className="py-4 d-flex justify-content-center align-items-center">
                        <ComponentSpinner />
                      </CardBody>
                    ) : (
                      <>
                        {cardData?.data?.map((card, index) => {
                          const isLastCard = index === data[data.length - 1];
                          return (
                            <>
                              {card?.default === true ? (
                                <div
                                  key={index}
                                  className={classnames("cardMaster rounded-4 p-2", {
                                    "mb-1": !isLastCard,
                                  })}
                                  style={{ backgroundColor: skin === 'light' ? "#EDF5FF" : "#3b4253" }}
                                >
                                  <div className="d-flex justify-content-between flex-sm-row flex-column">
                                    <div className="card-information">
                                      {/* <img
                                    src={card.imgSrc}
                                    alt={card.imgAlt}
                                    className="mb-1 img-fluid"
                                    style={{
                                      width: "42px",
                                    }}
                                  /> */}
                                      <div className="d-flex align-items-center mb-50">
                                        <h6 className="mb-0">{card?.cardHolderName}</h6>
                                        <Badge color="light-primary" className="ms-50">
                                          Default
                                        </Badge>
                                      </div>
                                      <span className="card-number">
                                        **** **** ****{" "}{card?.last4}
                                      </span>
                                    </div>
                                    <div className="d-flex flex-column  text-start text-lg-end">
                                      <div className="d-flex justify-content-end order-sm-0 order-1 mt-1 mt-sm-0 hidden">
                                        <Button >
                                          <div className="d-flex gap-1" >
                                            <span>Delete</span>
                                          </div>
                                        </Button>
                                      </div>
                                      <span className="mt-2">
                                        Card expires at {card?.expMonth} / {card?.expYear}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  key={index}
                                  className={classnames("cardMaster rounded-4 p-2", {
                                    "mb-1": !isLastCard,
                                  })}
                                  style={{ backgroundColor: skin === 'light' ? "#EDF5FF" : "#3b4253" }}
                                >
                                  <div className="d-flex justify-content-between flex-sm-row flex-column">
                                    <div className="card-information">
                                      {/* <img
                                    src={card.imgSrc}
                                    alt={card.imgAlt}
                                    className="mb-1 img-fluid"
                                    style={{
                                      width: "42px",
                                    }}
                                  /> */}
                                      <div className="d-flex align-items-center mb-50">
                                        <h6 className="mb-0">{card?.cardHolderName}</h6>
                                        <Badge onClick={() => dispatch(defaultCard({ paymentMethodId: card.paymentMethodId }))} color="light-success" className="ms-50 cursor-pointer">
                                          Make Default
                                        </Badge>
                                      </div>
                                      <span className="card-number">
                                        **** **** ****{" "}{card?.last4}
                                      </span>
                                    </div>
                                    <div className="d-flex flex-column  text-start text-lg-end">
                                      <div className="d-flex justify-content-end order-sm-0 order-1 mt-1 mt-sm-0">
                                        <Button onClick={() => handleDeleteCard(card.paymentMethodId)} color="danger" className="delete-btn danger">
                                          <div className="d-flex gap-1" >
                                            <span>Delete</span>
                                          </div>
                                        </Button>
                                      </div>
                                      <span className="mt-2">
                                        Card expires at {card?.expMonth} / {card?.expYear}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              ) : null}


            </Col>
            <Col lg={12} className="d-flex justify-content-md-start justify-content-center">
              <Button
                type="submit"
                className="save-button"
                style={{ borderRadius: "15px" }}
                color="primary"
              >
                <div className="d-flex gap-1">
                  <span>Save</span>
                  {addCardLoading !== 'idle' ? (
                    <Spinner style={{ width: "1rem", height: "1rem" }} />
                  ) : null}
                </div>
              </Button>
              <Button style={{ borderRadius: "15px" }} color="secondary" className="discard-cancel-btn">
                Cancel
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered"
        onClosed={() => setModalCardType("")}
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <h1 className="text-center mb-1">
            {selectedCondition ? "Edit" : "Add New"} Card
          </h1>
          <p className="text-center">
            {selectedCondition
              ? "Edit your saved card details"
              : "Add card for future billing"}
          </p>
          <Form tag={Row} className="gy-1 gx-2 mt-75">
            <Col xs={12}>
              <Label className="form-label" for="cardNumber">
                Card Number
              </Label>
              <InputGroup>
                <Cleave
                  disabled
                  id="cardNumber"
                  className="form-control"
                  value={selectedCondition ? `**** **** **** ${selected.last4}` : ""}
                  placeholder="1356 3215 6548 7898"
                  options={{
                    creditCard: true,
                    onCreditCardTypeChanged: (type) => {
                      setModalCardType(type);
                    },
                  }}
                />
                {cardType !== "" && cardType !== "unknown" ? (
                  <InputGroupText
                    className="position-absolute" style={{ zIndex: "100", right: "0", height: "100%", borderTopRightRadius: "20px", borderBottomRightRadius: "20px" }}
                  >
                    <img
                      height="24"
                      alt="card-type"
                      src={cardsObj[modalCardType]}
                    />
                  </InputGroupText>
                ) : null}
              </InputGroup>
            </Col>
            <Col md={6}>
              <Label className="form-label" for="cardHolderName">
                Name On Card
              </Label>
              <Input
                disabled
                id="cardHolderName"
                name="cardHolderName"
                placeholder="John Doe"
                defaultValue={selectedCondition ? selected.cardHolderName : ""}
              />
            </Col>
            <Col xs={6} md={3}>
              <Label className="form-label" for="expiryMonthNo">
                Exp. Date
              </Label>
              <Cleave
                disabled
                id="expiryMonthNo"
                name="expiryMonthNo"
                placeholder="MM/YY"
                className="form-control"
                options={{ delimiter: "/", blocks: [2, 2] }}
                value={selectedCondition ? `${selected.expMonth}/${selected.expYear}` : ""}
              />
            </Col>
            <Col xs={6} md={3}>
              <Label className="form-label" for="cvc">
                CVV
              </Label>
              <Cleave
                disabled
                id="cvc"
                name="cvc"
                placeholder="654"
                className="form-control"
                options={{ blocks: [3] }}
                value={selectedCondition ? selected.cvc : ""}
              />
            </Col>
            <Col xs={12}>
              <div className="d-flex align-items-center">
                <div className="form-switch w-100">
                  <Input
                    disabled
                    defaultChecked
                    type="switch"
                    name="futureBilling"
                    id="futureBilling"
                  />
                  <Label className="form-check-label" for="futureBilling">
                    <span className="switch-icon-left">
                      <Check size={14} />
                    </span>
                    <span className="switch-icon-right">
                      <X size={14} />
                    </span>
                  </Label>
                  <Label
                    className="form-check-label fw-bolder ms-1"
                    for="futureBilling"
                  >
                    Save Card for future billing?
                  </Label>
                </div>
              </div>
            </Col>
            <Col className="text-center mt-1" xs={12}>
              {/* <Button
                className="me-1"
                color="primary"
                onClick={() => setShow(!show)}
              >
                Submit
              </Button> */}
              <Button color="secondary" outline onClick={() => setShow(!show)}>
                Cancel
              </Button>
            </Col>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment >
  );
};

export default PaymentMethods;
