'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Sun, Leaf, Wind, Coffee, Moon, Star, ChevronRight, ArrowRight, Check } from 'lucide-react';

const GoldysFlavorQuiz = () => {
  const [currentStep, setCurrentStep] = useState<string | number>('intro');
  const [answers, setAnswers] = useState<any>({});
  const [progress, setProgress] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: 'vibe',
      question: 'When you light up, what\'s your ideal vibe?',
      icon: <Sparkles className="w-8 h-8" />,
      options: [
        { text: 'Sparking creativity', value: 'creative', emoji: '🎨' },
        { text: 'Total chill-out mode', value: 'chill', emoji: '😌' },
        { text: 'Social, upbeat energy', value: 'social', emoji: '🎉' },
        { text: 'Deep relaxation before bed', value: 'sleep', emoji: '😴' }
      ]
    },
    {
      id: 'flavor',
      question: 'Pick a flavor that sounds most tempting:',
      icon: <Leaf className="w-8 h-8" />,
      options: [
        { text: 'Sweet + fruity (berries, candy, citrus)', value: 'fruity', emoji: '🍓' },
        { text: 'Rich + gassy (fuel, skunky, loud)', value: 'gassy', emoji: '⛽' },
        { text: 'Earthy + herbal (sage, pine, spice)', value: 'earthy', emoji: '🌲' },
        { text: 'Smooth + classic (OG, kushy, balanced)', value: 'classic', emoji: '👑' }
      ]
    },
    {
      id: 'time',
      question: 'What\'s your favorite time to enjoy cannabis?',
      icon: <Sun className="w-8 h-8" />,
      options: [
        { text: 'Mornings to kick off the day', value: 'morning', emoji: '☀️' },
        { text: 'Afternoons for creativity/social energy', value: 'afternoon', emoji: '🌤️' },
        { text: 'Evenings to unwind', value: 'evening', emoji: '🌅' },
        { text: 'Late nights for deep chill & sleep', value: 'night', emoji: '🌙' }
      ]
    },
    {
      id: 'wine',
      question: 'If cannabis was wine, your taste would be:',
      icon: <Star className="w-8 h-8" />,
      options: [
        { text: 'Crisp white (refreshing, light)', value: 'white', emoji: '🥂' },
        { text: 'Bold red (deep, complex, strong)', value: 'red', emoji: '🍷' },
        { text: 'Rosé (balanced, social, fun)', value: 'rose', emoji: '🌸' },
        { text: 'Whiskey neat (classic, timeless, strong finish)', value: 'whiskey', emoji: '🥃' }
      ]
    },
    {
      id: 'ritual',
      question: 'What\'s your go-to smoke ritual?',
      icon: <Wind className="w-8 h-8" />,
      options: [
        { text: 'Roll a joint & enjoy slowly', value: 'joint', emoji: '🚬' },
        { text: 'Quick bong rip or dab', value: 'bong', emoji: '💨' },
        { text: 'Vape for flavor & smoothness', value: 'vape', emoji: '💭' },
        { text: 'Chill pre-roll at the end of the day', value: 'preroll', emoji: '🌿' }
      ]
    },
    {
      id: 'snack',
      question: 'Which "session snack" do you vibe with most?',
      icon: <Coffee className="w-8 h-8" />,
      options: [
        { text: 'Fresh fruit / sweet treats', value: 'sweet', emoji: '🍉' },
        { text: 'Spicy chips / bold flavors', value: 'spicy', emoji: '🌶️' },
        { text: 'Savory charcuterie / cheese board', value: 'savory', emoji: '🧀' },
        { text: 'Comfort food (pizza, pasta, burgers)', value: 'comfort', emoji: '🍕' }
      ]
    },
    {
      id: 'feel',
      question: 'How do you want your cannabis to feel?',
      icon: <Moon className="w-8 h-8" />,
      options: [
        { text: 'Clear-headed & creative', value: 'clear', emoji: '✨' },
        { text: 'Heavy-hitting & euphoric', value: 'heavy', emoji: '🚀' },
        { text: 'Relaxed & grounded', value: 'grounded', emoji: '🏔️' },
        { text: 'Balanced & smooth', value: 'balanced', emoji: '⚖️' }
      ]
    }
  ];

  const flavorProfiles = {
    fruity: {
      name: 'Fruity Explorer',
      description: 'You\'re all about those sweet, citrusy terps that lift your mood and brighten your day.',
      strains: ['Strawberry Cough', 'Tangie', 'Zkittlez'],
      color: 'from-pink-500 to-orange-500'
    },
    gassy: {
      name: 'Gas Master',
      description: 'You appreciate the loud, fuel-forward profiles that hit hard and leave an impression.',
      strains: ['Sour Diesel', 'ChemDog', 'GMO Cookies'],
      color: 'from-gray-700 to-purple-900'
    },
    earthy: {
      name: 'Earth Child',
      description: 'You connect with nature\'s essence through piney, herbal notes that ground your soul.',
      strains: ['Northern Lights', 'Jack Herer', 'Durban Poison'],
      color: 'from-green-600 to-green-800'
    },
    classic: {
      name: 'OG Connoisseur',
      description: 'You know quality when you taste it. Classic, balanced profiles are your signature.',
      strains: ['OG Kush', 'Girl Scout Cookies', 'Blue Dream'],
      color: 'from-indigo-600 to-blue-700'
    }
  };

  const calculateResult = () => {
    const flavorScore = { fruity: 0, gassy: 0, earthy: 0, classic: 0 };
    
    if (answers.flavor) flavorScore[answers.flavor] += 3;
    
    if (answers.vibe === 'creative') flavorScore.fruity += 2;
    if (answers.vibe === 'chill') flavorScore.classic += 2;
    if (answers.vibe === 'social') flavorScore.fruity += 1;
    if (answers.vibe === 'sleep') flavorScore.earthy += 2;
    
    if (answers.wine === 'white') flavorScore.fruity += 2;
    if (answers.wine === 'red') flavorScore.gassy += 2;
    if (answers.wine === 'rose') flavorScore.fruity += 1;
    if (answers.wine === 'whiskey') flavorScore.classic += 2;
    
    if (answers.snack === 'sweet') flavorScore.fruity += 1;
    if (answers.snack === 'spicy') flavorScore.gassy += 1;
    if (answers.snack === 'savory') flavorScore.earthy += 1;
    if (answers.snack === 'comfort') flavorScore.classic += 1;
    
    if (answers.feel === 'clear') flavorScore.fruity += 1;
    if (answers.feel === 'heavy') flavorScore.gassy += 2;
    if (answers.feel === 'grounded') flavorScore.earthy += 2;
    if (answers.feel === 'balanced') flavorScore.classic += 2;
    
    const topFlavor = Object.entries(flavorScore).reduce((a, b) => 
      flavorScore[a[0]] > b[1] ? a : b
    )[0];
    
    return flavorProfiles[topFlavor];
  };

  const handleStartQuiz = () => {
    setCurrentStep(0);
    setProgress(0);
    setAnswers({});
  };

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
    
    const currentQuestionIndex = questions.findIndex(q => q.id === questionId);
    const newProgress = ((currentQuestionIndex + 1) / questions.length) * 100;
    setProgress(newProgress);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentQuestionIndex + 1);
      }, 300);
    } else {
      setShowLoading(true);
      simulateLoading();
    }
  };

  const simulateLoading = () => {
    setLoadingProgress(0);
    const stages = [
      { progress: 35, delay: 800 },
      { progress: 70, delay: 1000 },
      { progress: 100, delay: 800 }
    ];

    let currentStage = 0;
    const runStage = () => {
      if (currentStage < stages.length) {
        setLoadingProgress(stages[currentStage].progress);
        setTimeout(() => {
          currentStage++;
          runStage();
        }, stages[currentStage].delay);
      } else {
        const calculatedResult = calculateResult();
        setResult(calculatedResult);
        setTimeout(() => {
          setCurrentStep('agreement');
          setShowLoading(false);
        }, 500);
      }
    };
    runStage();
  };

  const handleAgree = () => {
    setCurrentStep('results');
  };

  const renderIntro = () => (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4 md:p-8 text-white relative">
          {/* Leaf Icon - Top Right Corner */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8">
            <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur rounded-full">
              <Leaf className="w-8 h-8 md:w-12 md:h-12" />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Farm Landscape Image - Left Side on desktop, top on mobile */}
            <div className="flex-shrink-0 order-1 md:order-1">
              <img 
                src="/farm-landscape.png" 
                alt="Emerald Triangle farm landscape with golden hour lighting and cannabis fields"
                className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-lg shadow-md"
              />
            </div>
            
            {/* Headline and Text - Right Side on desktop, bottom on mobile */}
            <div className="flex-1 order-2 md:order-2 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-gray-900 leading-tight">Which Strain Flavor Fits Your Vibe?</h1>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Skip the hype. We'll match you with a flavor identity rooted in real Emerald Triangle terroir — then suggest the sun-grown strain that fits your ritual.
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Sun className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Sun-Grown California Cannabis</h3>
              <p className="text-gray-700">
                Discover which terpene profile matches your personality. 
                From gassy to fruity, earthy to classic — find your perfect match from 
                Goldy's premium Emerald Triangle collection.
              </p>
            </div>
          </div>


          <button
            onClick={handleStartQuiz}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-orange-500 transition-all transform hover:scale-[1.02] flex items-center justify-center group shadow-lg"
          >
            Start the Vibe Check
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            No email required • 100% free • Instant results
          </p>
        </div>
      </div>
    </div>
  );

  const renderQuestion = () => {
    if (typeof currentStep !== 'number') return null;
    const question = questions[currentStep];

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4">
            <div className="flex justify-between items-center mb-2 text-gray-900">
              <span className="text-sm font-medium">
                Question {currentStep + 1} of {questions.length}
              </span>
              <span className="text-sm font-bold">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-900/20 rounded-full h-2">
              <div
                className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full mb-4 text-yellow-700">
                {question.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {question.question}
              </h2>
            </div>

            <div className="grid gap-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(question.id, option.value)}
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-200 group text-left"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                      {option.text}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLoading = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-12">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping opacity-20"></div>
            <div className="relative flex items-center justify-center w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse">
              <Leaf className="w-16 h-16 text-gray-900" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Analyzing Your Vibe...
          </h2>
          <p className="text-gray-600 mb-6">
            {loadingProgress < 50 
              ? 'Checking our Flavor Match™ Database...'
              : loadingProgress < 80
              ? 'Analyzing terpene preferences...'
              : 'Finding your perfect match!'}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAgreement = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-white p-8 text-center border-b border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            🎉 Congratulations!
          </h2>
          <p className="text-gray-700 text-lg">
            We've matched you with your <strong>perfect cannabis flavor + strain vibe</strong> — 
            but before we reveal it, our team needs you to agree to a few quick guidelines 
            (our lawyers make us say this part 👇).
          </p>
        </div>

        <div className="p-8">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center text-lg">
            <Check className="w-6 h-6 mr-2 text-yellow-600" />
            Please Agree to the Following:
          </h3>

          <div className="space-y-4 mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
              <h4 className="font-bold text-gray-900 mb-2">
                1. Keep This Discovery Private
              </h4>
              <p className="text-gray-700">
                These strain matches are based on our <em>exclusive Flavor Match™ system</em> — 
                developed from decades of legacy Emerald Triangle farming knowledge. 
                Please don't share the details publicly, only with friends who will truly 
                appreciate the difference.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
              <h4 className="font-bold text-gray-900 mb-2">
                2. Use Responsibly
              </h4>
              <p className="text-gray-700">
                Our premium, sun-grown THCA flower is <em>stronger and tastier</em> than 
                most mass-produced cannabis. Many customers are shocked at the difference 
                in smoothness and potency. Please enjoy responsibly.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h4 className="font-bold text-gray-900 mb-2">
                3. Limited Access
              </h4>
              <p className="text-gray-700">
                Because we work only with small, family-run farms, availability is 
                extremely limited. We cannot guarantee your matched strain will remain 
                in stock — once it's gone, it's gone.
              </p>
            </div>
          </div>

          <p className="text-gray-700 mb-6 text-center font-medium">
            👉 If you agree to these guidelines, click below to unlock your 
            <strong className="text-yellow-700"> personalized flavor result + exclusive offer</strong>:
          </p>

          <button
            onClick={handleAgree}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-5 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-orange-500 transition-all transform hover:scale-[1.02] shadow-lg"
          >
            I AGREE — SHOW ME MY MATCH
          </button>

          <p className="text-xs text-gray-500 text-center mt-6">
            By clicking "I Agree" you confirm you are 21+ and understand these products 
            contain THCA which converts to THC when heated.
          </p>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl overflow-hidden">
        <div className={`bg-gradient-to-r ${result?.color || 'from-green-600 to-emerald-700'} p-8 text-white text-center`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur rounded-full mb-4">
            <Sparkles className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold mb-2">
            You're a {result?.name}!
          </h2>
          <p className="text-white/90 text-lg max-w-md mx-auto">
            {result?.description}
          </p>
        </div>

        <div className="p-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-3">🎯 Your Perfect Strains:</h3>
          <div className="grid grid-cols-3 gap-3">
            {result?.strains.map((strain, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 text-center shadow-sm">
                <div className="font-semibold text-gray-900">{strain}</div>
              </div>
            ))}
          </div>
        </div>

          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-gray-800 mb-3 text-lg">
              🌟 EXCLUSIVE OFFER: Get 20% Off Your First Order
            </h3>
            <p className="text-gray-700 mb-4">
              As a quiz taker, you qualify for our exclusive discount on any of your 
              matched strains. This offer expires in 48 hours.
            </p>
            <div className="bg-white rounded-lg px-6 py-3 inline-block shadow-sm border border-amber-200">
              <code className="text-xl font-mono font-bold text-amber-900">MYVIBE20</code>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center">
              <Sun className="w-5 h-5 mr-2 text-yellow-600" />
              Why Goldy's Flower?
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">✓</span>
                <span>Sun-grown in California's Emerald Triangle</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">✓</span>
                <span>Small-batch, family farm heritage</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">✓</span>
                <span>Lab-tested, Farm Bill compliant THCA</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">✓</span>
                <span>Shipped discreetly to your door</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => window.location.href = 'https://goldysflower.com'}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-500 hover:to-orange-500 transition-all transform hover:scale-[1.02] flex items-center justify-center group mb-4 shadow-lg"
          >
            Shop Your Perfect Match
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleStartQuiz}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            Retake Quiz
          </button>

          <p className="text-center text-xs text-gray-500 mt-6">
            Must be 21+ to purchase • Lab-tested & Farm Bill compliant
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-12 px-4" style={{backgroundColor: '#F8F7ED'}}>
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Main content */}
        {currentStep === 'intro' && renderIntro()}
        {typeof currentStep === 'number' && !showLoading && renderQuestion()}
        {showLoading && renderLoading()}
        {currentStep === 'agreement' && renderAgreement()}
        {currentStep === 'results' && renderResults()}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default GoldysFlavorQuiz;
