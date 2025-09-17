// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  resources: {
    en: {
      translation: {
        // 🌦 Weather
        weather: "Weather",
        temperature: "Temperature",
        humidity: "Humidity",
        uv_index: "UV Index",

        // 🌱 Soil
        soil_health: "Soil Health",
        moisture: "Moisture",
        nitrogen: "Nitrogen",
        phosphorus: "Phosphorus",
        potassium: "Potassium",
        health_score: "Health Score",
        ph: "pH",

        // 🏠 Interface
        home: "Home",
        profile: "Profile",
        settings: "Settings",
        language: "Language",
        agro_consultant: "AgroConsultant",
      }
    },
    hi: {
      translation: {
        weather: "मौसम",
        temperature: "तापमान",
        humidity: "आर्द्रता",
        uv_index: "यूवी सूचकांक",

        soil_health: "मिट्टी का स्वास्थ्य",
        moisture: "नमी",
        nitrogen: "नाइट्रोजन",
        phosphorus: "फास्फोरस",
        potassium: "पोटैशियम",
        health_score: "स्वास्थ्य स्कोर",
        ph: "पीएच",

        home: "मुखपृष्ठ",
        profile: "प्रोफ़ाइल",
        settings: "सेटिंग्स",
        language: "भाषा",
        agro_consultant: "एग्रो कंसल्टेंट",
      }
    },
    mr: {
      translation: {
        weather: "हवामान",
        temperature: "तापमान",
        humidity: "आर्द्रता",
        uv_index: "यूव्ही निर्देशांक",

        soil_health: "मातीचे आरोग्य",
        moisture: "आर्द्रता",
        nitrogen: "नायट्रोजन",
        phosphorus: "फॉस्फरस",
        potassium: "पोटॅशियम",
        health_score: "आरोग्य गुण",
        ph: "pH",

        home: "मुखपृष्ठ",
        profile: "प्रोफाइल",
        settings: "सेटिंग्ज",
        language: "भाषा",
        agro_consultant: "अ‍ॅग्रो कन्सल्टंट",
      }
    },
    pa: {
      translation: {
        weather: "ਮੌਸਮ",
        temperature: "ਤਾਪਮਾਨ",
        humidity: "ਨਮੀ",
        uv_index: "ਯੂਵੀ ਸੂਚਕ",

        soil_health: "ਮਿੱਟੀ ਦੀ ਸਿਹਤ",
        moisture: "ਨਮੀ",
        nitrogen: "ਨਾਈਟਰੋਜਨ",
        phosphorus: "ਫਾਸਫੋਰਸ",
        potassium: "ਪੋਟੈਸ਼ੀਅਮ",
        health_score: "ਸਿਹਤ ਅੰਕ",
        ph: "pH",

        home: "ਘਰ",
        profile: "ਪ੍ਰੋਫਾਈਲ",
        settings: "ਸੈਟਿੰਗਾਂ",
        language: "ਭਾਸ਼ਾ",
        agro_consultant: "ਐਗਰੋ ਕੌਂਸਲਟੈਂਟ",
      }
    },
    gu: {
      translation: {
        weather: "હવામાન",
        temperature: "તાપમાન",
        humidity: "ભેજ",
        uv_index: "યુવી સૂચકાંક",

        soil_health: "માટીની તંદુરસ્તી",
        moisture: "ભેજ",
        nitrogen: "નાઈટ્રોજન",
        phosphorus: "ફોસ્ફરસ",
        potassium: "પોટેશિયમ",
        health_score: "આરોગ્ય સ્કોર",
        ph: "pH",

        home: "મુખપૃષ્ઠ",
        profile: "પ્રોફાઇલ",
        settings: "સેટિંગ્સ",
        language: "ભાષા",
        agro_consultant: "એગ્રો કન્સલ્ટન્ટ",
      }
    },
  }
});

export default i18n;
