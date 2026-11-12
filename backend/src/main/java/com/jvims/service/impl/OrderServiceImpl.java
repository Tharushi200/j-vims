package com.jvims.service.impl;

import com.jvims.dto.*;
import com.jvims.entity.*;
import com.jvims.repository.*;
import com.jvims.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImportRepository importRepository;

    @Autowired
    private RegistrationTrackingRepository registrationRepository;

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Override
    public List<OrderDto> getCustomerOrders(String customerEmail) {
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return orderRepository.findByCustomerIdOrderByCreatedAtDesc(customer.getId()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public OrderDto getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        return convertToDto(order);
    }

    @Override
    @Transactional
    public OrderDto updateOrderStatus(Long orderId, String orderStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        order.setOrderStatus(Order.OrderStatus.valueOf(orderStatus.toUpperCase()));
        Order updated = orderRepository.save(order);
        return convertToDto(updated);
    }

    @Override
    @Transactional
    public ImportDto updateImportTracking(Long orderId, ImportDto dto) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        ImportEntity imp = importRepository.findByOrderId(orderId).orElseGet(() -> {
            ImportEntity newImp = new ImportEntity();
            newImp.setOrder(order);
            newImp.setVehicle(order.getVehicle());
            return newImp;
        });

        if (dto.getPurchaseDate() != null) imp.setPurchaseDate(dto.getPurchaseDate());
        if (dto.getJapanSupplierName() != null) imp.setJapanSupplierName(dto.getJapanSupplierName());
        if (dto.getJapanPurchasePriceJpy() != null) imp.setJapanPurchasePriceJpy(dto.getJapanPurchasePriceJpy());
        if (dto.getShippingMethod() != null) imp.setShippingMethod(dto.getShippingMethod());
        if (dto.getShipmentReferenceBl() != null) imp.setShipmentReferenceBl(dto.getShipmentReferenceBl());
        if (dto.getVesselName() != null) imp.setVesselName(dto.getVesselName());
        if (dto.getDeparturePort() != null) imp.setDeparturePort(dto.getDeparturePort());
        if (dto.getArrivalPort() != null) imp.setArrivalPort(dto.getArrivalPort());
        if (dto.getExpectedArrivalDate() != null) imp.setExpectedArrivalDate(dto.getExpectedArrivalDate());
        if (dto.getActualArrivalDate() != null) imp.setActualArrivalDate(dto.getActualArrivalDate());
        if (dto.getImportStatus() != null) imp.setImportStatus(ImportEntity.ImportStatus.valueOf(dto.getImportStatus().toUpperCase()));
        if (dto.getNotes() != null) imp.setNotes(dto.getNotes());

        ImportEntity saved = importRepository.save(imp);
        return convertImportToDto(saved);
    }

    @Override
    @Transactional
    public RegistrationTrackingDto updateRegistrationTracking(Long orderId, RegistrationTrackingDto dto) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        RegistrationTracking reg = registrationRepository.findByOrderId(orderId).orElseGet(() -> {
            RegistrationTracking newReg = new RegistrationTracking();
            newReg.setOrder(order);
            newReg.setVehicle(order.getVehicle());
            return newReg;
        });

        if (dto.getLawyerName() != null) reg.setLawyerName(dto.getLawyerName());
        if (dto.getLawyerContact() != null) reg.setLawyerContact(dto.getLawyerContact());
        if (dto.getSubmittedDate() != null) reg.setSubmittedDate(dto.getSubmittedDate());
        if (dto.getEstimatedCompletionDate() != null) reg.setEstimatedCompletionDate(dto.getEstimatedCompletionDate());
        if (dto.getActualCompletionDate() != null) reg.setActualCompletionDate(dto.getActualCompletionDate());
        if (dto.getRegistrationStatus() != null) reg.setRegistrationStatus(RegistrationTracking.RegistrationStatus.valueOf(dto.getRegistrationStatus().toUpperCase()));
        if (dto.getNotes() != null) reg.setNotes(dto.getNotes());

        RegistrationTracking saved = registrationRepository.save(reg);
        return convertRegToDto(saved);
    }

    @Override
    @Transactional
    public DeliveryDto updateDeliveryTracking(Long orderId, DeliveryDto dto) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        Delivery del = deliveryRepository.findByOrderId(orderId).orElseGet(() -> {
            Delivery newDel = new Delivery();
            newDel.setOrder(order);
            newDel.setVehicle(order.getVehicle());
            return newDel;
        });

        if (dto.getDeliveryAddress() != null) del.setDeliveryAddress(dto.getDeliveryAddress());
        if (dto.getContactPerson() != null) del.setContactPerson(dto.getContactPerson());
        if (dto.getContactPhone() != null) del.setContactPhone(dto.getContactPhone());
        if (dto.getScheduledDeliveryDate() != null) del.setScheduledDeliveryDate(dto.getScheduledDeliveryDate());
        if (dto.getActualDeliveryDate() != null) del.setActualDeliveryDate(dto.getActualDeliveryDate());
        if (dto.getDeliveryStatus() != null) del.setDeliveryStatus(Delivery.DeliveryStatus.valueOf(dto.getDeliveryStatus().toUpperCase()));
        if (dto.getNotes() != null) del.setNotes(dto.getNotes());

        Delivery saved = deliveryRepository.save(del);
        return convertDeliveryToDto(saved);
    }

    private OrderDto convertToDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setTotalAmountLkr(order.getTotalAmountLkr());
        dto.setPaidAmountLkr(order.getPaidAmountLkr());
        dto.setPaymentStatus(order.getPaymentStatus().name());
        dto.setOrderStatus(order.getOrderStatus().name());
        dto.setNotes(order.getNotes());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setUpdatedAt(order.getUpdatedAt());

        if (order.getCustomer() != null) {
            dto.setCustomer(new UserDto(order.getCustomer().getId(), order.getCustomer().getFullName(), order.getCustomer().getEmail(), order.getCustomer().getPhone(), order.getCustomer().getStatus().name(), null, order.getCustomer().getCreatedAt()));
        }

        // Attach sub-trackers if available
        importRepository.findByOrderId(order.getId()).ifPresent(imp -> dto.setImportTracking(convertImportToDto(imp)));
        registrationRepository.findByOrderId(order.getId()).ifPresent(reg -> dto.setRegistrationTracking(convertRegToDto(reg)));
        deliveryRepository.findByOrderId(order.getId()).ifPresent(del -> dto.setDeliveryTracking(convertDeliveryToDto(del)));

        return dto;
    }

    private ImportDto convertImportToDto(ImportEntity imp) {
        ImportDto dto = new ImportDto();
        dto.setId(imp.getId());
        dto.setOrderId(imp.getOrder().getId());
        dto.setPurchaseDate(imp.getPurchaseDate());
        dto.setJapanSupplierName(imp.getJapanSupplierName());
        dto.setJapanPurchasePriceJpy(imp.getJapanPurchasePriceJpy());
        dto.setShippingMethod(imp.getShippingMethod());
        dto.setShipmentReferenceBl(imp.getShipmentReferenceBl());
        dto.setVesselName(imp.getVesselName());
        dto.setDeparturePort(imp.getDeparturePort());
        dto.setArrivalPort(imp.getArrivalPort());
        dto.setExpectedArrivalDate(imp.getExpectedArrivalDate());
        dto.setActualArrivalDate(imp.getActualArrivalDate());
        dto.setImportStatus(imp.getImportStatus().name());
        dto.setNotes(imp.getNotes());
        return dto;
    }

    private RegistrationTrackingDto convertRegToDto(RegistrationTracking reg) {
        RegistrationTrackingDto dto = new RegistrationTrackingDto();
        dto.setId(reg.getId());
        dto.setOrderId(reg.getOrder().getId());
        dto.setLawyerName(reg.getLawyerName());
        dto.setLawyerContact(reg.getLawyerContact());
        dto.setSubmittedDate(reg.getSubmittedDate());
        dto.setEstimatedCompletionDate(reg.getEstimatedCompletionDate());
        dto.setActualCompletionDate(reg.getActualCompletionDate());
        dto.setRegistrationStatus(reg.getRegistrationStatus().name());
        dto.setNotes(reg.getNotes());
        return dto;
    }

    private DeliveryDto convertDeliveryToDto(Delivery del) {
        DeliveryDto dto = new DeliveryDto();
        dto.setId(del.getId());
        dto.setOrderId(del.getOrder().getId());
        dto.setDeliveryAddress(del.getDeliveryAddress());
        dto.setContactPerson(del.getContactPerson());
        dto.setContactPhone(del.getContactPhone());
        dto.setScheduledDeliveryDate(del.getScheduledDeliveryDate());
        dto.setActualDeliveryDate(del.getActualDeliveryDate());
        dto.setDeliveryStatus(del.getDeliveryStatus().name());
        dto.setNotes(del.getNotes());
        return dto;
    }
}
