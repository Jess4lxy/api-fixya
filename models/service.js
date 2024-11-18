export default class Service {
    constructor(id, category, serviceType, description, basePrice, quantityAdjustment){
        this.id = id;
        this.category = category;
        this.serviceType = serviceType;
        this.description = description;
        this.basePrice = basePrice;
        this.quantityAdjustment = quantityAdjustment;
    }
}