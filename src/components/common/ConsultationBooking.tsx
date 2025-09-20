import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, DollarSign, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PaymentForm from './PaymentForm';

const ConsultationBooking = () => {
  const [currentStep, setCurrentStep] = useState<'booking' | 'payment' | 'confirmation'>('booking');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    duration: '1',
    message: ''
  });

  const hourlyRate = 50;
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const durations = [
    { value: '1', label: '1 Hour' },
    { value: '2', label: '2 Hours' },
    { value: '3', label: '3 Hours' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateTotal = () => {
    return hourlyRate * parseInt(formData.duration);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Move to payment step
    setCurrentStep('payment');
  };

  const handlePaymentComplete = () => {
    setCurrentStep('confirmation');
    toast({
      title: "Payment Successful!",
      description: `Your consultation has been booked and paid for. You'll receive a confirmation email shortly.`,
    });
  };

  const handleBackToBooking = () => {
    setCurrentStep('booking');
  };

  // Show payment form
  if (currentStep === 'payment') {
    return (
      <PaymentForm 
        amount={calculateTotal()} 
        onBack={handleBackToBooking}
        onPaymentComplete={handlePaymentComplete}
      />
    );
  }

  // Show confirmation
  if (currentStep === 'confirmation') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="border-green-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-600 flex items-center justify-center gap-2">
              <DollarSign className="h-6 w-6" />
              Booking Confirmed!
            </CardTitle>
            <CardDescription className="text-lg">
              Your consultation has been successfully booked and paid for.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Booking Details:</h3>
              <p className="text-green-700">Date: {formData.date}</p>
              <p className="text-green-700">Time: {formData.time}</p>
              <p className="text-green-700">Duration: {formData.duration} hour(s)</p>
              <p className="text-green-700">Total Paid: ${calculateTotal()}</p>
            </div>
            <p className="text-muted-foreground text-center">
              You'll receive a confirmation email with meeting details shortly.
            </p>
            <Button 
              onClick={() => {
                setCurrentStep('booking');
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  date: '',
                  time: '',
                  duration: '1',
                  message: ''
                });
              }}
              className="w-full"
            >
              Book Another Consultation
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary flex items-center justify-center gap-2">
            <Calendar className="h-6 w-6" />
            Book a Consultation
          </CardTitle>
          <CardDescription className="text-lg">
            Schedule a consultation with our automation experts
          </CardDescription>
          <div className="bg-primary/5 p-4 rounded-lg mt-4">
            <div className="flex items-center justify-center gap-2 text-primary font-semibold">
              <DollarSign className="h-5 w-5" />
              <span className="text-xl">${hourlyRate}/hour</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Professional consultation on business automation solutions
            </p>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            {/* Scheduling */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time *
                </Label>
                <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration.value} value={duration.value}>
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Message (Optional)
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Tell us about your automation needs..."
                rows={4}
              />
            </div>

            {/* Pricing Summary */}
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Cost:</span>
                <span className="text-xl font-bold text-primary">
                  ${calculateTotal()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {formData.duration} hour(s) × ${hourlyRate}/hour
              </p>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg">
              <DollarSign className="h-4 w-4 mr-2" />
              Proceed to Payment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationBooking;