export default class Service {
    constructor(id, category, serviceType, basePrice, quantityAdjustment, description){
        this.id = id;
        this.category = category;
        this.serviceType = serviceType;
        this.basePrice = basePrice;
        this.quantityAdjustment = quantityAdjustment;
        this.description = description;
    }
}