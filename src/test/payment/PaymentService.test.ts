import { PaymentDetails, PaymentMethod } from '../../app/payment/PaymentDetails';
import { PaymentService } from '../../app/payment/PaymentService';

describe('Payment Service', () => {
  const paymentAdapterMock = {
    processPayment: jest.fn(),
  };
  let paymentService: PaymentService;

  beforeEach(() => {
    paymentService = new PaymentService(paymentAdapterMock);
  });

  test('should successfully process a valid payment', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data
    const mockPaymentDetails: PaymentDetails ={amount:100,currency:'Euro',method: PaymentMethod.BankTransfer , cardNumber:'123'};

    //TODO: Create mockProcessPaymentResponse object containing success status and a fake transactiondId
    const mockProcessPaymentResponse = {status: 'success',transactionId: '9763',};
    
    //TODO: Mock processPayment implementation
    paymentAdapterMock.processPayment.mockImplementation((mockPaymentDetails:PaymentDetails)=>mockProcessPaymentResponse)

    // Act
    const result = paymentService.makePayment(mockPaymentDetails);
    // Assert
    // Check the returned result is equal to the success message returned by makePayment with thefake  transactionId you have defined in mockProcessPaymentResponse
    expect(result).toEqual(mockProcessPaymentResponse);
    // Check that processPayment inside makePayment has been called with paymentDetails
    expect(paymentAdapterMock.processPayment).toHaveBeenCalledWith(mockPaymentDetails); 

  });

  test('should throw an error for payment failure', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data
    const mockPaymentDetails: PaymentDetails ={amount:3000,currency:'USD',method: PaymentMethod.CreditCard , cardNumber:'456'};
    //TODO: Create mockProcessPaymentResponse object containing failure status
    const mockProcessPaymentResponse = {status: 'failure',transactionId: '9763',};
    //TODO: Mock processPayment implementation
    paymentAdapterMock.processPayment.mockImplementation((mockPaymentDetails:PaymentDetails)=>mockProcessPaymentResponse)

    // Act & Assert
    expect(() => paymentService.makePayment(mockPaymentDetails)).toThrow('Payment failed');
  });

  test('should throw an error for invalid payment amount', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data where amount should be negative or undefined
    const mockPaymentDetails: PaymentDetails ={amount:-3000,currency:'USD',method: PaymentMethod.CreditCard , cardNumber:'456'};

    // Act & Assert
    expect(() => paymentService.makePayment(mockPaymentDetails)).toThrow('Invalid payment amount');
  });
});
