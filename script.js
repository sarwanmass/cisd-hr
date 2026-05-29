document.addEventListener('DOMContentLoaded', () => {
    
    // Add simple scroll animation for elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial style for animated elements
    const animateElements = document.querySelectorAll('.learning-card, .feature-item, .audience-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        observer.observe(el);
    });

    // Handle form submission to WhatsApp
    const form = document.getElementById('hrRegistrationForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const qualification = document.getElementById('qualification').value;
            
            // Validate inputs (basic)
            if (!fullName || !email || !phone || !qualification) {
                alert('Please fill out all fields.');
                return;
            }
            
            // Construct WhatsApp Message
            const message = `*New Registration: HR Training Program*
            
*Name:* ${fullName}
*Email:* ${email}
*Phone:* ${phone}
*Qualification/Background:* ${qualification}

I am interested in joining the HR Training program. Please share further details.`;

            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Target Phone Number
            const targetNumber = '919483153874';
            
            // Create WhatsApp Link
            const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodedMessage}`;
            
            // Open in new tab
            window.open(whatsappUrl, '_blank');
            
            // Optional: reset form
            // form.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Chat Widget Logic
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });

        closeChat.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });

        const addMessage = (text, isUser = false) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
            msgDiv.textContent = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const handleSend = () => {
            const text = chatInput.value.trim();
            if (!text) return;
            
            addMessage(text, true);
            chatInput.value = '';

            // Simulate AI Typing & Response
            setTimeout(() => {
                const lowerText = text.toLowerCase();
                let language = 'en'; // Default English
                
                // Detect Language based on script or common words
                if (/[\u0C80-\u0CFF]/.test(text) || lowerText.match(/\b(enu|hege|eshtu|kannada|yavaaga|duddu)\b/)) {
                    language = 'kn';
                }

                // Default Fallback Response based on detected language
                let response = "I am CISD's virtual assistant! Please register via WhatsApp or call +91 9483153874 for more details.";
                if (language === 'kn') {
                    response = "ನಾನು CISD ವರ್ಚುವಲ್ ಅಸಿಸ್ಟೆಂಟ್! ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ ದಯವಿಟ್ಟು WhatsApp ಮೂಲಕ ನೋಂದಾಯಿಸಿ ಅಥವಾ +91 9483153874 ಗೆ ಕರೆ ಮಾಡಿ.";
                }
                
                // Intents mapping with full translations
                const intents = [
                    {
                        keywords: ['fee', 'cost', 'price', 'money', 'charge', 'how much', 'fees', 'eshtu', 'duddu', 'ಬೆಲೆ', 'ಫೀಸ್'],
                        responses: {
                            en: "Our program fee is highly affordable with special discounts! Contact our coordinator at +91 9483153874 for exact details.",
                            kn: "ನಮ್ಮ ತರಬೇತಿ ಶುಲ್ಕವು ತುಂಬಾ ಕೈಗೆಟುಕುವಂತಿದೆ! ನಿಖರವಾದ ಶುಲ್ಕದ ವಿವರಗಳಿಗಾಗಿ ದಯವಿಟ್ಟು ನಮ್ಮ ಸಂಯೋಜಕರನ್ನು +91 9483153874 ನಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ."
                        }
                    },
                    {
                        keywords: ['curriculum', 'learn', 'syllabus', 'teach', 'what is', 'topics', 'enu', 'ವಿಷಯ', 'ಸಿಲಬಸ್'],
                        responses: {
                            en: "We teach: Talent Acquisition, Advance Excel, Payroll, ESI/PF, Labour Codes, Analytics, and AI. Visit our Curriculum page for more!",
                            kn: "ನಾವು ಟ್ಯಾಲೆಂಟ್ ಅಕ್ವಿಸಿಷನ್, ಅಡ್ವಾನ್ಸ್ ಎಕ್ಸೆಲ್, ಪೇರೋಲ್, ESI/PF, ಲೇಬರ್ ಕೋಡ್ಸ್, ಮತ್ತು AI ಅನ್ನು ಕಲಿಸುತ್ತೇವೆ. ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ ಪಠ್ಯಕ್ರಮ ಪುಟವನ್ನು ಭೇಟಿ ಮಾಡಿ!"
                        }
                    },
                    {
                        keywords: ['duration', 'time', 'long', 'months', 'weeks', 'schedule', 'yavaaga', 'ಸಮಯ', 'ಅವಧಿ'],
                        responses: {
                            en: "The training is comprehensive yet fast-paced. We offer flexible weekend and evening batches for working professionals!",
                            kn: "ನಾವು ಕೆಲಸ ಮಾಡುವ ವೃತ್ತಿಪರರಿಗಾಗಿ ಹೊಂದಿಕೊಳ್ಳುವ ವಾರಾಂತ್ಯ (weekend) ಮತ್ತು ಸಂಜೆಯ ಬ್ಯಾಚ್‌ಗಳನ್ನು ನೀಡುತ್ತೇವೆ!"
                        }
                    },
                    {
                        keywords: ['job', 'placement', 'interview', 'career', 'hiring', 'support', 'ಪ್ಲೇಸ್‌ಮೆಂಟ್', 'ಕೆಲಸ'],
                        responses: {
                            en: "Absolutely! We focus heavily on Interview Skills and you can network with industry professionals to boost placement chances.",
                            kn: "ಹೌದು! ನಾವು ಸಂದರ್ಶನ ಕೌಶಲ್ಯಗಳ (Interview Skills) ಮೇಲೆ ಹೆಚ್ಚು ಗಮನ ಹರಿಸುತ್ತೇವೆ ಮತ್ತು ಪ್ಲೇಸ್‌ಮೆಂಟ್ ಅವಕಾಶಗಳನ್ನು ಹೆಚ್ಚಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ."
                        }
                    },
                    {
                        keywords: ['certificate', 'certification', 'recognized', 'valid', 'ಪ್ರಮಾಣಪತ್ರ', 'ಸರ್ಟಿಫಿಕೇಟ್'],
                        responses: {
                            en: "Yes, upon successful completion, you will receive an industry-recognized CISD certification that adds massive value to your resume.",
                            kn: "ಹೌದು, ತರಬೇತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ ನಂತರ, ನೀವು ಉದ್ಯಮ-ಮಾನ್ಯತೆ ಪಡೆದ CISD ಪ್ರಮಾಣಪತ್ರವನ್ನು ಪಡೆಯುತ್ತೀರಿ."
                        }
                    },
                    {
                        keywords: ['language', 'medium', 'understand', 'ಭಾಷೆ', 'kannada', 'english'],
                        responses: {
                            en: "Yes, our training is fully bilingual. The trainers explain complex topics like Payroll in English and Kannada.",
                            kn: "ಹೌದು, ನಮ್ಮ ತರಬೇತಿಯು ದ್ವಿಭಾಷಾ ಆಗಿದೆ. ನಿಮಗೆ ಸಂಪೂರ್ಣವಾಗಿ ಅರ್ಥವಾಗಲು ನಾವು ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕನ್ನಡದಲ್ಲಿ ತರಬೇತಿ ನೀಡುತ್ತೇವೆ."
                        }
                    },
                    {
                        keywords: ['hello', 'hi', 'hey', 'namaskara', 'good morning', 'ನಮಸ್ಕಾರ'],
                        responses: {
                            en: "Hello there! Welcome to CISD. How can I assist you with your HR career today? Feel free to ask about our curriculum or fees!",
                            kn: "ನಮಸ್ಕಾರ! CISD ಗೆ ಸುಸ್ವಾಗತ. ನಿಮ್ಮ HR ವೃತ್ತಿಜೀವನಕ್ಕೆ ಸಂಬಂಧಿಸಿದಂತೆ ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?"
                        }
                    }
                ];

                for (let intent of intents) {
                    if (intent.keywords.some(kw => lowerText.includes(kw))) {
                        response = intent.responses[language];
                        break; 
                    }
                }

                addMessage(response, false);
            }, 800);
        };

        sendMessage.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
});
