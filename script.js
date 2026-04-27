// 1. THE DATABASE (Hardcoded for zero-maintenance hosting)
const properties = [
    {
        id: "obsidian-manor",
        name: "The Obsidian Manor",
        location: "Ibeju-Lekki, Lagos",
        price: "₦450,000,000",
        category: "Duplex",
        isSold: false, // Change to true to mark this house as sold!
        mainVideo: "/videos/home.mp4",
        thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        amenities: { beds: 5, baths: 6, size: "4,500 sqft" },
        description: "A masterpiece of modern architecture featuring smart home integration and a private infinity pool.",
        galleryImages: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80", 
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0", 
            "https://images.unsplash.com/photo-1560448204-61dc36dc98c8"
        ]
    },
    {
        id: "azure-penthouse",
        name: "Azure Sky Penthouse",
        location: "Victoria Island, Lagos",
        price: "₦850,000,000",
        category: "Penthouse",
        isSold: false,
        mainVideo: "/videos/penthouse.mp4",
        thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        amenities: { beds: 4, baths: 4, size: "3,200 sqft" },
        description: "Experience the clouds with 360-degree views of the Atlantic Ocean and world-class finishes.",
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
        mainVideo: "videos/lakeside.mp4",
        thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
        amenities: { beds: 6, baths: 7, size: "6,000 sqft" },
        description: "A lush retreat featuring floor-to-ceiling glass walls and a private cinema room.",
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
        mainVideo: "/videos/land.mp4",
        thumbnail: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef",
        amenities: { beds: 6, baths: 7, size: "7,200 sqft" },
        description: "An ultra-modern sanctuary boasting dark brutalist architecture, biometric security, and a state-of-the-art underground auto gallery.",
        galleryImages: [
            "https://images.unsplash.com/photo-1600607686527-6fb886090705", 
            "https://images.unsplash.com/photo-1600210491369-e753d80a41f3", 
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea"
        ]
    }
];

// 2. BOOT UP THE RIGHT PAGE
// Figure out which page the user is on and run the right function immediately
if (document.getElementById('property-grid')) {
    loadGallery();
} else if (document.getElementById('details-container')) {
    renderDetails();
}

// 3. RENDER THE HOME PAGE GALLERY
function loadGallery(dataToLoad = properties) {
    const grid = document.getElementById('property-grid');
    if(!grid) return;
    
    grid.innerHTML = ""; // Clear grid before adding new cards

    dataToLoad.forEach(house => {
        // Logic for "Sold" properties
        const isSold = house.isSold; // Pointing back to our local array!
        const soldBadge = isSold ? `<div class="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 text-[10px] font-bold z-20 shadow-lg">SOLD</div>` : '';
        const soldOverlay = isSold ? `grayscale opacity-50` : '';
        const buttonText = isSold ? 'Sold Out' : 'View Details';
        const buttonClass = isSold ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

        grid.innerHTML += `
            <div class="property-card relative" ${isSold ? '' : `onclick="goToDetails('${house.id}')"`}>
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
        if (video) { // Only add hover if video exists (skips sold houses)
            card.addEventListener('mouseenter', () => video.play());
            card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
        }
    });
}

// 6. RENDER THE PROPERTY DETAILS PAGE
function renderDetails() {
    const detailsContainer = document.getElementById('details-container');
    if (!detailsContainer) return; 

    // Read the ID from the website URL
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
                </div>

                <div class="w-full md:w-80">
                    <div class="bg-[#1A1A1A] p-8 border border-white/5 sticky top-32">
                        <p class="text-xs text-gray-500 uppercase tracking-widest mb-2">Investment Price</p>
                        <h2 class="text-3xl font-bold mb-6">${house.price}</h2>
                        
                        <a href="https://wa.me/2348012345678?text=Hello Aura Luxe! I am ready to view ${house.name}" target="_blank"
   class="block w-full bg-[#C5A059] text-black text-center py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all">
    Request Private Tour
</a>
                        <p class="text-[10px] text-gray-600 mt-6 text-center italic">Our advisors respond within 15 minutes.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <section class="max-w-6xl mx-auto px-6 py-20">
            <h2 class="text-3xl font-serif mb-10 italic">Inside the Residence</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${(house.galleryImages || []).map(img => `
                    <div class="overflow-hidden bg-zinc-900 aspect-square group cursor-pointer">
                        <img src="${img}" 
                             class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                             onclick="openLightbox('${img}')">
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

// 7. LIGHTBOX FUNCTION (Full-screen images)
function openLightbox(src) {
    const box = document.createElement('div');
    box.id = 'lightbox';
    box.className = "fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-10 cursor-pointer";
    box.innerHTML = `<img src="${src}" class="max-w-full max-h-full shadow-2xl border border-white/10 animate-in zoom-in duration-300">`;
    
    box.onclick = () => box.remove();
    document.body.appendChild(box);
}

// 8. FILTER LOGIC
function filterProperties(category) {
    const grid = document.getElementById('property-grid');
    if (!grid) return;
    
    // Create a new list of houses that match the category
    const filtered = category === 'All' 
        ? properties 
        : properties.filter(h => h.category === category);

    // Re-draw the grid with only those houses
    loadGallery(filtered);
}

// 9. SAFE EVENT LISTENERS (Scroll & Loader)
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
});

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
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