// 1. THE DATABASE (With ROI, Maps, and Videos)
const properties = [
    {
        id: "obsidian-manor",
        name: "The Obsidian Manor",
        location: "Ibeju-Lekki, Lagos",
        price: "₦450,000,000",
        category: "Duplex",
        isSold: false,
        mainVideo: "./videos/home.mp4",
        thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        amenities: { beds: 5, baths: 6, size: "4,500 sqft" },
        description: "A masterpiece of modern architecture featuring smart home integration and a private infinity pool.",
        roi: { yield: "12% - 15%", appreciation: "20% YOY", title: "Governor's Consent" },
        mapUrl: "https://maps.google.com/maps?q=Ibeju-Lekki,Lagos&t=&z=13&ie=UTF8&iwloc=&output=embed",
        galleryImages: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80", 
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0", 
            "https://images.unsplash.com/photo-1560448204-61dc36dc98c8",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750", 
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811"
        ]
    },
    {
        id: "azure-penthouse",
        name: "Azure Sky Penthouse",
        location: "Victoria Island, Lagos",
        price: "₦850,000,000",
        category: "Penthouse",
        isSold: false,
        mainVideo: "./videos/penthouse.mp4",
        thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        amenities: { beds: 4, baths: 4, size: "3,200 sqft" },
        description: "Experience the clouds with 360-degree views of the Atlantic Ocean and world-class finishes.",
        roi: { yield: "10% - 12%", appreciation: "15% YOY", title: "C of O" },
        mapUrl: "https://maps.google.com/maps?q=Victoria+Island,Lagos&t=&z=13&ie=UTF8&iwloc=&output=embed",
        galleryImages: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80", 
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"
        ]
    },
    {
        id: "emerald-villa",
        name: "Emerald Valley Villa",
        location: "Lekki Phase 1, Lagos",
        price: "₦320,000,000",
        category: "Mansion",
        isSold: false,
        mainVideo: "./videos/lakeside.mp4",
        thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
        amenities: { beds: 6, baths: 7, size: "6,000 sqft" },
        description: "A lush retreat featuring floor-to-ceiling glass walls and a private cinema room.",
        roi: { yield: "14% - 18%", appreciation: "22% YOY", title: "Governor's Consent" },
        mapUrl: "https://maps.google.com/maps?q=Lekki+Phase+1,Lagos&t=&z=13&ie=UTF8&iwloc=&output=embed",
        galleryImages: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80", 
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0", 
            "https://images.unsplash.com/photo-1560448204-61dc36dc98c8"
        ]
    },
    {
        id: "the-onyx-residence",
        name: "The Onyx Residence",
        location: "Banana Island, Lagos",
        price: "₦1,200,000,000",
        category: "Smart Villa",
        isSold: false,
        mainVideo: "./videos/land.mp4",
        thumbnail: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef",
        amenities: { beds: 6, baths: 7, size: "7,200 sqft" },
        description: "An ultra-modern sanctuary boasting dark brutalist architecture, biometric security, and a state-of-the-art underground auto gallery.",
        roi: { yield: "8% - 10%", appreciation: "12% YOY", title: "Global C of O" },
        mapUrl: "https://maps.google.com/maps?q=Banana+Island,Lagos&t=&z=14&ie=UTF8&iwloc=&output=embed",
        galleryImages: [
            "https://images.unsplash.com/photo-1600607686527-6fb886090705", 
            "https://images.unsplash.com/photo-1600210491369-e753d80a41f3", 
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea"
        ]
    }
];

// 2. BOOT UP THE RIGHT PAGE
if (document.getElementById('property-grid')) {
    loadGallery(properties);
} else if (document.getElementById('details-container')) {
    renderDetails();
}

// 3. RENDER THE HOME PAGE GALLERY
function loadGallery(dataToLoad) {
    const grid = document.getElementById('property-grid');
    if(!grid) return;
    
    grid.innerHTML = ""; 

    dataToLoad.forEach(house => {
        const isSold = house.isSold; 
        const soldBadge = isSold ? `<div class="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 text-[10px] font-bold z-20 shadow-lg">SOLD</div>` : '';
        const soldOverlay = isSold ? `grayscale opacity-50` : '';
        const buttonText = isSold ? 'Sold Out' : 'View Details';
        const buttonClass = isSold ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

        grid.innerHTML += `
            <div class="property-card relative" data-aos="fade-up" ${isSold ? '' : `onclick="goToDetails('${house.id}')"`}>
                ${soldBadge}
                <div class="media-container ${soldOverlay}">
                    <img src="${house.thumbnail}" alt="${house.name}">
                    ${isSold ? '' : `<video muted loop playsinline class="card-video"><source src="${house.mainVideo}" type="video/mp4"></video>`}
                </div>
                <div class="info">
                    <span class="tag">${house.category}</span>
                    <h3>${house.name}</h3>
                    <p class="loc"><i class="fas fa-map-marker-alt"></i> ${house.location}</p>
                    <div class="stats">
                        <span><i class="fas fa-bed"></i> ${house.amenities.beds}</span>
                        <span><i class="fas fa-bath"></i> ${house.amenities.baths}</span>
                    </div>
                    <div class="flex items-center justify-between mt-6">
                        <span class="text-2xl font-bold text-white">${house.price}</span>
                        <span class="view-btn ${buttonClass}">${buttonText}</span>
                    </div>
                </div>
            </div>
        `;
    });
    setupHovers();
}

// 4. NAVIGATION TO DETAILS PAGE
function goToDetails(id) {
    window.location.href = `property-details.html?id=${id}`;
}

// 5. VIDEO HOVER EFFECTS
function setupHovers() {
    document.querySelectorAll('.property-card').forEach(card => {
        const video = card.querySelector('video');
        if (video) { 
            card.addEventListener('mouseenter', () => video.play());
            card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
        }
    });
}

// 6. CATEGORY FILTER LOGIC
function filterProperties(category) {
    const grid = document.getElementById('property-grid');
    if (!grid) return;
    
    const filteredList = category === 'All' 
        ? properties 
        : properties.filter(house => house.category === category);

    loadGallery(filteredList);
}

// 7. RENDER THE PROPERTY DETAILS PAGE
function renderDetails() {
    const detailsContainer = document.getElementById('details-container');
    if (!detailsContainer) return; 

    const params = new URLSearchParams(window.location.search);
    const houseId = params.get('id');
    const house = properties.find(p => p.id === houseId);

    if (!house) {
        detailsContainer.innerHTML = "<h2 class='text-center py-20 text-2xl font-serif italic text-gray-500'>Property Not Found</h2>";
        return;
    }

    detailsContainer.innerHTML = `
        <section class="w-full h-[70vh] bg-black relative">
            <video autoplay muted loop playsinline class="w-full h-full object-cover opacity-80">
                <source src="${house.mainVideo}" type="video/mp4">
            </video>
            <div class="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
        </section>

        <div class="max-w-6xl mx-auto px-6 -mt-32 relative z-10">
            <div class="flex flex-col md:flex-row gap-12">
                
                <div class="flex-1">
                    <span class="text-[#C5A059] tracking-[4px] uppercase text-xs">${house.category}</span>
                    <h1 class="text-5xl md:text-7xl font-serif mt-4 mb-6 italic">${house.name}</h1>
                    <p class="text-gray-400 text-lg leading-relaxed mb-8">${house.description}</p>
                    
                    <div class="grid grid-cols-3 gap-8 py-8 border-y border-white/10 mb-10">
                        <div class="text-center">
                            <i class="fas fa-bed text-[#C5A059] mb-2"></i>
                            <p class="text-xs uppercase tracking-widest text-gray-500">Bedrooms</p>
                            <p class="text-xl">${house.amenities.beds}</p>
                        </div>
                        <div class="text-center">
                            <i class="fas fa-bath text-[#C5A059] mb-2"></i>
                            <p class="text-xs uppercase tracking-widest text-gray-500">Bathrooms</p>
                            <p class="text-xl">${house.amenities.baths}</p>
                        </div>
                        <div class="text-center">
                            <i class="fas fa-maximize text-[#C5A059] mb-2"></i>
                            <p class="text-xs uppercase tracking-widest text-gray-500">Square Feet</p>
                            <p class="text-xl">${house.amenities.size}</p>
                        </div>
                    </div>

                    <h2 class="text-2xl font-serif mb-6 italic text-[#C5A059]">Investment Potential</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        <div class="bg-[#1A1A1A] p-6 border border-white/5 rounded">
                            <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Rental Yield</p>
                            <p class="text-2xl font-bold">${house.roi.yield}</p>
                        </div>
                        <div class="bg-[#1A1A1A] p-6 border border-white/5 rounded">
                            <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Appreciation</p>
                            <p class="text-2xl font-bold text-green-500"><i class="fas fa-arrow-trend-up"></i> ${house.roi.appreciation}</p>
                        </div>
                        <div class="bg-[#1A1A1A] p-6 border border-white/5 rounded">
                            <p class="text-xs text-gray-500 uppercase tracking-widest mb-1">Title</p>
                            <p class="text-lg font-bold">${house.roi.title}</p>
                        </div>
                    </div>
                </div>

                <div class="w-full md:w-80">
                    <div class="bg-[#1A1A1A] p-8 border border-white/5 sticky top-32">
                        <p class="text-xs text-gray-500 uppercase tracking-widest mb-2">Investment Price</p>
                        <h2 class="text-3xl font-bold mb-6">${house.price}</h2>
                        
                        <a href="https://wa.me/2348012345678?text=I am ready to view ${house.name}" target="_blank"
                           class="block w-full bg-[#C5A059] text-black text-center py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all mb-4">
                            Request Private Tour
                        </a>

                        <button onclick="openBrochureModal()" 
                           class="block w-full border border-[#C5A059] text-[#C5A059] text-center py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#C5A059] hover:text-black transition-all">
                            <i class="fas fa-download mr-2"></i> Download Brochure
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <section class="max-w-6xl mx-auto px-6 py-10">
            <h2 class="text-3xl font-serif mb-6 italic">Cinematic Tour</h2>
            <div class="w-full aspect-video bg-black border border-white/10 rounded overflow-hidden shadow-2xl">
                <video controls class="w-full h-full object-cover">
                    <source src="${house.mainVideo}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>

        <section class="max-w-6xl mx-auto px-6 py-10">
            <div class="flex justify-between items-end mb-6">
                <h2 class="text-3xl font-serif italic">Inside the Residence</h2>
                <span class="text-[#C5A059] text-xs uppercase tracking-widest">Swipe to view &rarr;</span>
            </div>
            
            <div class="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6" style="scrollbar-width: none; -ms-overflow-style: none;">
                ${(house.galleryImages || []).map(img => `
                    <div class="flex-none w-[85%] md:w-[45%] snap-center overflow-hidden bg-zinc-900 aspect-[4/3] group cursor-pointer border border-white/5 rounded">
                        <img src="${img}" 
                             class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                             onclick="openLightbox('${img}')">
                    </div>
                `).join('')}
            </div>
        </section>

        <section class="max-w-6xl mx-auto px-6 py-10 mb-20">
            <h2 class="text-3xl font-serif mb-6 italic">Location Context</h2>
            <div class="w-full h-96 border border-white/10 rounded overflow-hidden">
                <iframe src="${house.mapUrl}" width="100%" height="100%" style="border:0; filter: grayscale(100%) invert(90%);" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </section>

        <div id="brochure-modal" class="fixed inset-0 z-[200] bg-black/90 hidden flex items-center justify-center p-4 opacity-0 transition-opacity duration-300">
            <div class="bg-[#1A1A1A] border border-[#C5A059]/30 p-10 max-w-md w-full relative">
                <button onclick="closeBrochureModal()" class="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">
                    <i class="fas fa-times"></i>
                </button>
                <h3 class="text-2xl font-serif text-[#C5A059] italic mb-2">Unlock the Details</h3>
                <p class="text-sm text-gray-400 mb-6">Enter your details to receive the full floorplan and investment prospectus for ${house.name}.</p>
                <form onsubmit="submitLead(event)">
                    <input type="text" placeholder="Full Name" required class="w-full bg-black border border-white/10 p-3 mb-4 text-sm focus:outline-none focus:border-[#C5A059] text-white">
                    <input type="email" placeholder="Email Address" required class="w-full bg-black border border-white/10 p-3 mb-6 text-sm focus:outline-none focus:border-[#C5A059] text-white">
                    <button type="submit" class="w-full bg-[#C5A059] text-black font-bold uppercase tracking-widest text-xs py-4 hover:bg-white transition-colors">
                        Get Instant Access
                    </button>
                </form>
            </div>
        </div>
    `;
    
    // Tiny snippet to hide scrollbar for webkit browsers on the carousel
    const style = document.createElement('style');
    style.innerHTML = `::-webkit-scrollbar { display: none; }`;
    document.head.appendChild(style);
}

// 8. LIGHTBOX FUNCTION
function openLightbox(src) {
    const box = document.createElement('div');
    box.id = 'lightbox';
    box.className = "fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-10 cursor-pointer";
    box.innerHTML = `<img src="${src}" class="max-w-full max-h-full shadow-2xl border border-white/10 animate-in zoom-in duration-300">`;
    
    box.onclick = () => box.remove();
    document.body.appendChild(box);
}

// 9. MODAL LOGIC
function openBrochureModal() {
    const modal = document.getElementById('brochure-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    setTimeout(() => { modal.classList.remove('opacity-0'); }, 10);
}

function closeBrochureModal() {
    const modal = document.getElementById('brochure-modal');
    if (!modal) return;
    modal.classList.add('opacity-0');
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
}

function submitLead(event) {
    event.preventDefault(); 
    alert("Thank you! The brochure has been sent to your email. Our advisor will be in touch.");
    closeBrochureModal();
}

// 10. CRASH-PROOF SCROLL & ONE-TIME LOADER LOGIC
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
});

// Grab the loader element
const loader = document.getElementById('loader');

// Check the browser's temporary memory (Session Storage)
if (sessionStorage.getItem('hasSeenAuraLoader') === 'true') {
    // If they have already seen the loader this session, instantly delete it
    if (loader) {
        loader.style.display = 'none';
        loader.remove();
    }
} else {
    // If it is their very first time opening the website, save that fact to memory
    sessionStorage.setItem('hasSeenAuraLoader', 'true');
    
    // And allow the animation to play normally
    window.addEventListener('load', () => {
        const bar = document.getElementById('loader-bar');
        
        if (bar) {
            bar.style.transition = "transform 1s ease";
            bar.style.transform = "translateX(0)";
        }
        
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = "0";
                setTimeout(() => loader.remove(), 700);
            }, 1200);
        }
    });
}

// 11. BFCache / BACK BUTTON BUG FIXER
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // If the phone served a frozen page via back button, make sure the loader is dead
        if (loader) loader.remove();
        
        // Force the invisible animation cards to instantly show
        const cards = document.querySelectorAll('.property-card');
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'none';
        });
        if (typeof AOS !== 'undefined') AOS.refresh();
    }
});

// 12. NUMBER COUNTER ANIMATION (Developer Pedigree)
document.addEventListener('DOMContentLoaded', () => {
    const counterSection = document.getElementById('counter-section');
    if (!counterSection) return;

    // This checks if the user has scrolled down to the numbers
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            
            // Run the counting animation
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const speed = 100; // Lower number = faster counting
                
                const updateCount = () => {
                    const count = +counter.innerText;
                    const increment = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
            
            // Stop watching once it counts up (so it doesn't repeat)
            observer.disconnect(); 
        }
    }, { threshold: 0.5 }); // Triggers when the section is 50% visible on screen
    
    observer.observe(counterSection);
});

// 13. FAQ ACCORDION LOGIC
document.addEventListener('DOMContentLoaded', () => {
    const faqButtons = document.querySelectorAll('.faq-btn');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = button.querySelector('i');

            // Optional: Close all other open FAQs when you click a new one
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.querySelector('.faq-answer').style.maxHeight = null;
                    item.querySelector('i').classList.replace('fa-minus', 'fa-plus');
                    item.querySelector('i').style.transform = 'rotate(0deg)';
                }
            });

            // Toggle the current FAQ open or closed
            if (answer.style.maxHeight) {
                // If it's open, close it
                answer.style.maxHeight = null;
                icon.classList.replace('fa-minus', 'fa-plus');
                icon.style.transform = 'rotate(0deg)';
            } else {
                // If it's closed, open it dynamically to its exact height
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.classList.replace('fa-plus', 'fa-minus');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});