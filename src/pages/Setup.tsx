import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Setup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [hospitalName, setHospitalName] = useState('City General Hospital');
  const [location, setLocation] = useState('Mumbai');
  const [contactNumber, setContactNumber] = useState('+91-22-12345678');
  const [floors, setFloors] = useState('3');
  
  const [bedsCount, setBedsCount] = useState('30');
  const [nursesCount, setNursesCount] = useState('10');
  const [doctorsCount, setDoctorsCount] = useState('8');
  const [icuBeds, setIcuBeds] = useState('5');

  const handleNext = () => {
    if (step === 1) {
      if (!hospitalName || !location || !contactNumber || !floors) {
        toast.error('Please fill all fields');
        return;
      }
      if (parseInt(floors) < 1 || parseInt(floors) > 10) {
        toast.error('Floors must be between 1 and 10');
        return;
      }
    }
    
    if (step === 2) {
      if (!bedsCount || !nursesCount || !doctorsCount || !icuBeds) {
        toast.error('Please fill all fields');
        return;
      }
    }
    
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate hospital setup
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Save setup data
      localStorage.setItem('setup_complete', 'true');
      localStorage.setItem('hospital_info', JSON.stringify({
        hospital_name: hospitalName,
        location,
        contact_number: contactNumber,
        floors: parseInt(floors),
        beds_count: parseInt(bedsCount),
        nurses_count: parseInt(nursesCount),
        doctors_count: parseInt(doctorsCount),
        icu_beds: parseInt(icuBeds),
      }));
      
      toast.success('Hospital setup complete! ✅', {
        description: 'Redirecting to dashboard...',
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      toast.error('Setup failed. Please try again.');
      setIsGenerating(false);
    }
  };

  const progressSteps = [
    { number: 1, title: 'Hospital Details' },
    { number: 2, title: 'Configure Resources' },
    { number: 3, title: 'Review & Generate' },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Hospital Setup Wizard</h1>
            <p className="text-sm text-muted-foreground">
              Step {step} of 3: {progressSteps[step - 1].title}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center justify-between mb-8">
          {progressSteps.map((s, index) => (
            <div key={s.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                  step >= s.number
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step > s.number ? <CheckCircle className="w-5 h-5" /> : s.number}
              </div>
              {index < progressSteps.length - 1 && (
                <div
                  className={`w-24 h-1 mx-2 ${
                    step > s.number ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Hospital Details */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hospital-name">Hospital Name</Label>
              <Input
                id="hospital-name"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                placeholder="City General Hospital"
                className="bg-popover"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location/City</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Mumbai"
                className="bg-popover"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="+91-22-12345678"
                className="bg-popover"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="floors">Number of Floors (1-10)</Label>
              <Input
                id="floors"
                type="number"
                min="1"
                max="10"
                value={floors}
                onChange={(e) => setFloors(e.target.value)}
                className="bg-popover"
              />
            </div>

            <Button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90 mt-6">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 2: Configure Resources */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="beds">How many BEDS?</Label>
              <Input
                id="beds"
                type="number"
                value={bedsCount}
                onChange={(e) => setBedsCount(e.target.value)}
                placeholder="30"
                className="bg-popover"
              />
              <p className="text-xs text-muted-foreground">
                ℹ️ We'll distribute across floors
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nurses">How many NURSES?</Label>
              <Input
                id="nurses"
                type="number"
                value={nursesCount}
                onChange={(e) => setNursesCount(e.target.value)}
                placeholder="15"
                className="bg-popover"
              />
              <p className="text-xs text-muted-foreground">
                ℹ️ Auto-assigned specializations
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctors">How many DOCTORS?</Label>
              <Input
                id="doctors"
                type="number"
                value={doctorsCount}
                onChange={(e) => setDoctorsCount(e.target.value)}
                placeholder="8"
                className="bg-popover"
              />
              <p className="text-xs text-muted-foreground">
                ℹ️ Auto-assigned specializations
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="icu">Emergency Beds (ICU)</Label>
              <Input
                id="icu"
                type="number"
                value={icuBeds}
                onChange={(e) => setIcuBeds(e.target.value)}
                placeholder="5"
                className="bg-popover"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-primary hover:bg-primary/90">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Generate */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-muted space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Hospital</p>
                <p className="font-semibold">{hospitalName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold">{location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Floors</p>
                <p className="font-semibold">{floors}</p>
              </div>
            </div>

            <div className="p-4 rounded-lg border-2 border-primary/20 space-y-2">
              <p className="font-semibold mb-3">Resources to Generate:</p>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>{bedsCount} Beds (across {floors} floors)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>{nursesCount} Nurses (mixed specializations)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>{doctorsCount} Doctors (mixed specializations)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>{icuBeds} ICU Beds</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
              <p className="text-sm">
                ⚠️ This will create your hospital infrastructure. Ready?
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1"
                disabled={isGenerating}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1 bg-gradient-primary hover:opacity-90 text-primary-foreground font-bold"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Hospital...
                  </>
                ) : (
                  <>
                    🚀 Generate Hospital
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
