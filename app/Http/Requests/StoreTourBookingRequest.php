<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTourBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tour_id' => 'required|exists:tours,id',
            'tour_date' => 'required|date|after_or_equal:today',
            'tour_time' => 'required|date_format:H:i',
            'number_of_people' => 'required|integer|min:1|max:20',
            'customer_name' => 'required|string|max:255',
            'customer_phone' => 'required|string|max:20',
            'customer_email' => 'required|email|max:255',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'tour_id.required' => 'Please select a tour.',
            'tour_id.exists' => 'The selected tour is not available.',
            'tour_date.required' => 'Tour date is required.',
            'tour_date.after_or_equal' => 'Tour date must be today or later.',
            'tour_time.required' => 'Tour time is required.',
            'tour_time.date_format' => 'Please provide a valid time format (HH:MM).',
            'number_of_people.required' => 'Number of people is required.',
            'number_of_people.min' => 'At least 1 person is required.',
            'number_of_people.max' => 'Maximum 20 people allowed.',
            'customer_name.required' => 'Customer name is required.',
            'customer_phone.required' => 'Phone number is required.',
            'customer_email.required' => 'Email address is required.',
            'customer_email.email' => 'Please provide a valid email address.',
        ];
    }
}