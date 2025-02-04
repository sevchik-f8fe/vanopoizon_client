import { create } from "zustand";

export const useDeliveryData = create((set) => ({
    deliveryData: {
        'fullName': { value: '', error: null },
        'phone': { value: '+7', error: null },
        'city': { value: { name: '', code: '', coords: [] }, error: null },
        'fullAddress': { value: '', error: null },
        'pvz': { value: { smallAddress: '', fullAddress: '' }, error: null },
        'deliveryType': { value: 'pickup', error: null },
    },
    loading: false,
    setFieldValue: (field, value) => set((state) => {
        console.log(field + ": " + JSON.stringify(value))
        return { deliveryData: { ...state.deliveryData, [field]: { error: null, value } } }
    }),
    setFieldError: (field, error) => set((state) => {
        console.log(field + ": " + error)
        return { deliveryData: { ...state.deliveryData, [field]: { ...state.deliveryData[field], error } } }
    }),
    setLoading: (value) => set(() => {
        return { loading: value }
    }),
}))