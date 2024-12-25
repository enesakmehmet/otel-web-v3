// Otel odaları verisi
const rooms = [
    {
        id: 1,
        type: 'standard',
        name: 'Standart Oda',
        price: 500,
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
        description: 'Konforlu ve şık standart odalarımız',
        capacity: 2,
        images: [
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
            'https://images.unsplash.com/photo-1587985064135-0366536eab42',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd'
        ]
    },
    {
        id: 2,
        type: 'deluxe',
        name: 'Deluxe Oda',
        price: 750,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1',
        description: 'Geniş ve lüks deluxe odalarımız',
        capacity: 3
    },
    {
        id: 3,
        type: 'suite',
        name: 'Suit Oda',
        price: 1000,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1',
        description: 'En üst düzey konfor sunan suit odalarımız',
        capacity: 4
    },
    {
        id: 9,
        type: 'seaside',
        name: 'Deniz Manzaralı Oda',
        price: 1100,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd',
        description: 'Muhteşem deniz manzaralı lüks odalar',
        capacity: 2
    },
    {
        id: 10,
        type: 'penthouse',
        name: 'Penthouse Suite',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
        description: 'Şehir manzaralı özel tasarım penthouse',
        capacity: 6
    },
    {
        id: 11,
        type: 'spa',
        name: 'Spa Suite',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
        description: 'Özel spa alanı bulunan lüks suite',
        capacity: 2
    },
    {
        id: 12,
        type: 'duplex',
        name: 'Dublex Aile Odası',
        price: 1600,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
        description: 'İki katlı geniş aile odası',
        capacity: 6
    },
    {
        id: 13,
        type: 'economy',
        name: 'Ekonomik Oda',
        price: 300,
        image: 'https://images.unsplash.com/photo-1541123356219-284ebe98ae3b',
        description: 'Bütçe dostu konforlu odalar',
        capacity: 2
    },
    {
        id: 14,
        type: 'business',
        name: 'İş Odası',
        price: 850,
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
        description: 'Çalışma alanı ve toplantı masası bulunan özel oda',
        capacity: 2
    },
    {
        id: 15,
        type: 'mountain',
        name: 'Dağ Manzaralı Oda',
        price: 950,
        image: 'https://images.unsplash.com/photo-1501117716987-c8c394bb29df',
        description: 'Dağ ve orman manzaralı huzurlu odalar',
        capacity: 3
    },
    {
        id: 16,
        type: 'villa',
        name: 'Villa Suite',
        price: 2800,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
        description: 'Özel havuzlu bağımsız villa suite',
        capacity: 8
    },
    {
        id: 17,
        type: 'studio',
        name: 'Stüdyo Oda',
        price: 400,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
        description: 'Kompakt ve fonksiyonel stüdyo odalar',
        capacity: 2
    },
    {
        id: 18,
        type: 'terrace',
        name: 'Teras Suite',
        price: 1300,
        image: 'https://images.unsplash.com/photo-1576675466969-38eeae4b41f6',
        description: 'Geniş özel terası olan suite oda',
        capacity: 4
    }
];

// LocalStorage işlemleri
const RESERVATIONS_KEY = 'hotelReservations';

// Rezervasyonları localStorage'dan al
function getReservations() {
    return JSON.parse(localStorage.getItem(RESERVATIONS_KEY)) || [];
}

// Rezervasyonu localStorage'a kaydet
function saveReservation(reservation) {
    const reservations = getReservations();
    reservations.push(reservation);
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));
}

// Rezervasyonu sil
function deleteReservation(index) {
    const reservations = getReservations();
    reservations.splice(index, 1);
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));
    displayReservations();
}

// Odaları görüntüleme fonksiyonu
function displayRooms(roomsToDisplay = rooms) {
    const roomsContainer = document.getElementById('roomsContainer');
    if (!roomsContainer) return;

    roomsContainer.innerHTML = roomsToDisplay.map(room => `
        <div class="col-md-4 mb-4">
            <div class="room-card card h-100">
                <div class="card-img-wrapper">
                    <img src="${room.image}" class="card-img-top" alt="${room.name}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${room.name}</h5>
                    <p class="card-text">${room.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span>
                            <i class="fas fa-user"></i> ${room.capacity} Kişilik
                        </span>
                        <span class="price">${room.price} TL / gece</span>
                    </div>
                </div>
                <div class="card-footer bg-white border-0">
                    <a href="room-detail.html?id=${room.id}" class="btn btn-primary w-100">
                        Detayları Gör
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    // Oda kartlarına tıklama olayı ekle
    const roomCards = document.querySelectorAll('.room-card');
    roomCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.matches('.btn')) {
                const link = card.querySelector('a.btn');
                if (link) {
                    link.click();
                }
            }
        });
    });
}

// Oda seçimi
function selectRoom(roomType) {
    document.getElementById('roomType').value = roomType;
    document.querySelector('.hero-section').scrollIntoView({ behavior: 'smooth' });
}

// Rezervasyonları görüntüle
function displayReservations() {
    const reservationsList = document.getElementById('reservationsList');
    const reservations = getReservations();

    if (reservations.length === 0) {
        reservationsList.innerHTML = '<p class="text-center">Henüz rezervasyonunuz bulunmamaktadır.</p>';
        return;
    }

    reservationsList.innerHTML = reservations.map((reservation, index) => `
        <div class="reservation-item">
            <div class="d-flex justify-content-between align-items-center">
                <h5>${reservation.roomType}</h5>
                <button class="btn btn-danger btn-sm" onclick="deleteReservation(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <p>
                <i class="fas fa-calendar"></i> ${reservation.checkIn} - ${reservation.checkOut}<br>
                <i class="fas fa-user"></i> ${reservation.guests} Kişi<br>
                <i class="fas fa-lira-sign"></i> ${reservation.totalPrice} TL
            </p>
        </div>
    `).join('');
}

// Tarih kontrolü
function validateDates(checkIn, checkOut) {
    const today = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate < today) {
        alert('Geçmiş bir tarih seçemezsiniz!');
        return false;
    }

    if (checkOutDate <= checkInDate) {
        alert('Çıkış tarihi giriş tarihinden sonra olmalıdır!');
        return false;
    }

    return true;
}

// Toplam fiyat hesaplama
function calculateTotalPrice(checkIn, checkOut, roomType) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
    const room = rooms.find(r => r.type === roomType);
    return room.price * nights;
}

// Form submit işlemi
document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const guests = document.getElementById('guests').value;
    const roomType = document.getElementById('roomType').value;

    if (!validateDates(checkIn, checkOut)) {
        return;
    }

    const totalPrice = calculateTotalPrice(checkIn, checkOut, roomType);

    const reservation = {
        checkIn,
        checkOut,
        guests,
        roomType,
        totalPrice,
        date: new Date().toISOString()
    };

    saveReservation(reservation);
    this.reset();
    alert('Rezervasyonunuz başarıyla oluşturuldu!');
});

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // Ana sayfada ise odaları göster
    if (document.getElementById('roomsContainer')) {
        displayRooms(rooms);
    }

    // Minimum tarih ayarı
    const today = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    if (checkInInput && checkOutInput) {
        checkInInput.min = today;
        checkOutInput.min = today;
        
        // Check-in tarihi değiştiğinde check-out minimum tarihini güncelle
        checkInInput.addEventListener('change', () => {
            checkOutInput.min = checkInInput.value;
        });
    }
});

// Filtreleme fonksiyonları
function addFilterSystem() {
    const filterHTML = `
        <div class="filter-section mb-4">
            <div class="row g-3">
                <div class="col-md-3">
                    <input type="text" class="form-control" id="searchRoom" 
                           placeholder="Oda ara...">
                </div>
                <div class="col-md-2">
                    <select class="form-select" id="priceFilter">
                        <option value="">Fiyat Sırala</option>
                        <option value="low">En Düşük Fiyat</option>
                        <option value="high">En Yüksek Fiyat</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <select class="form-select" id="capacityFilter">
                        <option value="">Kişi Sayısı</option>
                        <option value="1">1 Kişilik</option>
                        <option value="2">2 Kişilik</option>
                        <option value="3">3 Kişilik</option>
                        <option value="4+">4+ Kişilik</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <div class="price-range">
                        <label>Fiyat Aralığı: <span id="priceValue">0-5000 TL</span></label>
                        <input type="range" class="form-range" id="priceRange" 
                               min="0" max="5000" step="100">
                    </div>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-secondary w-100" onclick="resetFilters()">
                        Filtreleri Sıfırla
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const roomsSection = document.getElementById('rooms');
    roomsSection.insertAdjacentHTML('afterbegin', filterHTML);

    // Event listeners
    document.getElementById('searchRoom').addEventListener('input', filterRooms);
    document.getElementById('priceFilter').addEventListener('change', filterRooms);
    document.getElementById('capacityFilter').addEventListener('change', filterRooms);
    document.getElementById('priceRange').addEventListener('input', updatePriceRange);
}

function updatePriceRange(e) {
    document.getElementById('priceValue').textContent = `0-${e.target.value} TL`;
    filterRooms();
}

function filterRooms() {
    let filteredRooms = [...rooms];
    const searchTerm = document.getElementById('searchRoom').value.toLowerCase();
    const priceSort = document.getElementById('priceFilter').value;
    const capacity = document.getElementById('capacityFilter').value;
    const maxPrice = parseInt(document.getElementById('priceRange').value);

    // Arama filtresi
    filteredRooms = filteredRooms.filter(room => 
        room.name.toLowerCase().includes(searchTerm) || 
        room.description.toLowerCase().includes(searchTerm)
    );

    // Kapasite filtresi
    if (capacity) {
        if (capacity === '4+') {
            filteredRooms = filteredRooms.filter(room => room.capacity >= 4);
        } else {
            filteredRooms = filteredRooms.filter(room => 
                room.capacity === parseInt(capacity)
            );
        }
    }

    // Fiyat aralığı filtresi
    filteredRooms = filteredRooms.filter(room => room.price <= maxPrice);

    // Fiyat sıralama
    if (priceSort === 'low') {
        filteredRooms.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'high') {
        filteredRooms.sort((a, b) => b.price - a.price);
    }

    displayFilteredRooms(filteredRooms);
}

function displayFilteredRooms(filteredRooms) {
    const roomsContainer = document.getElementById('roomsContainer');
    if (filteredRooms.length === 0) {
        roomsContainer.innerHTML = `
            <div class="col-12 text-center">
                <h3>Sonuç bulunamadı</h3>
                <p>Lütfen farklı filtreleme seçenekleri deneyin.</p>
            </div>
        `;
        return;
    }
    displayRooms(filteredRooms);
}

function resetFilters() {
    document.getElementById('searchRoom').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('capacityFilter').value = '';
    document.getElementById('priceRange').value = 5000;
    document.getElementById('priceValue').textContent = '0-5000 TL';
    displayRooms(rooms);
}

// Rastgele yorumlar için veri havuzu
const reviewPool = {
    names: ['Ahmet Y.', 'Mehmet K.', 'Ayşe S.', 'Fatma D.', 'Ali B.', 'Zeynep T.', 'Can M.', 'Deniz A.', 'Ece P.', 'Berk O.'],
    comments: [
        'Harika bir deneyimdi, kesinlikle tekrar geleceğim.',
        'Odalar çok temiz ve personel çok ilgili.',
        'Manzara muhteşemdi, çok memnun kaldık.',
        'Fiyat/performans açısından ideal bir seçim.',
        'Konfor ve hizmet kalitesi beklentilerimizin üstündeydi.',
        'Kahvaltı çeşitleri çok zengindi.',
        'Konum olarak çok merkezi bir yerde.',
        'Odalar çok ferah ve modern tasarlanmış.',
        'Personel çok yardımsever ve güler yüzlüydü.',
        'Temizlik konusunda çok titizler.'
    ],
    ratings: [4, 4.5, 5, 3.5, 4, 4.5, 5, 3, 4, 4.5],
    dates: ['2024-01-15', '2024-02-01', '2024-02-15', '2024-03-01', '2024-03-15']
};

// Oda özellikleri için detaylı bilgiler
const roomFeatures = {
    amenities: {
        basic: ['Ücretsiz Wi-Fi', 'Klima', 'LCD TV', 'Minibar', 'Kasa', 'Duş'],
        deluxe: ['Ücretsiz Wi-Fi', 'Klima', 'Smart TV', 'Minibar', 'Kasa', 'Jakuzi', 'Balkon'],
        suite: ['Ücretsiz Wi-Fi', 'Klima', 'Smart TV', 'Minibar', 'Kasa', 'Jakuzi', 'Balkon', 'Oturma Alanı', 'Şömine']
    },
    views: ['Şehir Manzarası', 'Deniz Manzarası', 'Bahçe Manzarası', 'Havuz Manzarası', 'Dağ Manzarası'],
    images: {
        standard: [
            'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
            'https://images.unsplash.com/photo-1587985064135-0366536eab42',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd'
        ],
        deluxe: [
            'https://images.unsplash.com/photo-1590490360182-c33d57733427',
            'https://images.unsplash.com/photo-1595576508898-0ad5c879a061',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'
        ],
        suite: [
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39',
            'https://images.unsplash.com/photo-1591088398332-8a7791972843',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427'
        ]
    }
};

// Rastgele yorum oluşturma fonksiyonu
function generateRandomReviews(count = 5) {
    const reviews = [];
    for (let i = 0; i < count; i++) {
        reviews.push({
            name: reviewPool.names[Math.floor(Math.random() * reviewPool.names.length)],
            comment: reviewPool.comments[Math.floor(Math.random() * reviewPool.comments.length)],
            rating: reviewPool.ratings[Math.floor(Math.random() * reviewPool.ratings.length)],
            date: reviewPool.dates[Math.floor(Math.random() * reviewPool.dates.length)]
        });
    }
    return reviews;
}

// Oda detay modalını güncelle
function showRoomDetails(roomId) {
    const room = rooms.find(r => r.id === roomId);
    const reviews = generateRandomReviews();
    const roomType = room.price > 1000 ? 'suite' : room.price > 600 ? 'deluxe' : 'basic';
    const features = roomFeatures.amenities[roomType];
    const images = roomFeatures.images[roomType] || roomFeatures.images.standard;

    const modalHTML = `
        <div class="modal fade" id="roomDetailModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${room.name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Resim Galerisi -->
                        <div id="roomCarousel" class="carousel slide mb-4" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                ${images.map((img, index) => `
                                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                        <img src="${img}" class="d-block w-100" alt="Oda Görünüm ${index + 1}">
                                    </div>
                                `).join('')}
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#roomCarousel" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon"></span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#roomCarousel" data-bs-slide="next">
                                <span class="carousel-control-next-icon"></span>
                            </button>
                        </div>

                        <!-- Oda Bilgileri -->
                        <div class="room-info mb-4">
                            <h6>Oda Özellikleri:</h6>
                            <div class="row">
                                ${features.map(feature => `
                                    <div class="col-md-4 mb-2">
                                        <i class="fas fa-check text-success"></i> ${feature}
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="room-description mb-4">
                            <h6>Oda Açıklaması:</h6>
                            <p>${room.description}</p>
                            <div class="price-info">
                                <h4 class="text-primary">${room.price.toLocaleString()} TL / Gece</h4>
                            </div>
                        </div>

                        <!-- Kullanıcı Yorumları -->
                        <div class="reviews-section">
                            <h6>Misafir Yorumları:</h6>
                            ${reviews.map(review => `
                                <div class="review-item mb-3 p-3 bg-light rounded">
                                    <div class="d-flex justify-content-between">
                                        <strong>${review.name}</strong>
                                        <small class="text-muted">${review.date}</small>
                                    </div>
                                    <div class="rating mb-2">
                                        ${Array(Math.floor(review.rating)).fill('★').join('')}
                                        ${review.rating % 1 ? '½' : ''}
                                        ${Array(5 - Math.ceil(review.rating)).fill('☆').join('')}
                                    </div>
                                    <p class="mb-0">${review.comment}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                        <button type="button" class="btn btn-primary" onclick="selectRoom('${room.type}')" data-bs-dismiss="modal">
                            Rezervasyon Yap
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = new bootstrap.Modal(document.getElementById('roomDetailModal'));
    modal.show();
    
    // Modal kapandığında DOM'dan kaldır
    document.getElementById('roomDetailModal').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

// Rezervasyon onayı
function sendConfirmationEmail(reservation) {
    const room = rooms.find(r => r.type === reservation.roomType);
    const emailContent = `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Rezervasyon Onayı</h2>
            <p>Sayın Misafirimiz,</p>
            <p>Rezervasyonunuz başarıyla oluşturulmuştur.</p>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
                <h4>Rezervasyon Detayları:</h4>
                <p>Oda: ${room.name}</p>
                <p>Giriş: ${reservation.checkIn}</p>
                <p>Çıkış: ${reservation.checkOut}</p>
                <p>Kişi Sayısı: ${reservation.guests}</p>
                <p>Toplam: ${reservation.totalPrice} TL</p>
            </div>
            
            <p>Sorularınız için bize ulaşabilirsiniz.</p>
            <p>İyi tatiller dileriz!</p>
        </div>
    `;
    
    // E-posta gönderimi simülasyonu
    console.log('Rezervasyon onay e-postası gönderildi:', emailContent);
    return emailContent;
}

// Oda müsaitlik kontrolü
function checkAvailability(roomType, checkIn, checkOut) {
    const reservations = getReservations();
    const conflictingReservations = reservations.filter(res => {
        if (res.roomType !== roomType) return false;
        
        const resCheckIn = new Date(res.checkIn);
        const resCheckOut = new Date(res.checkOut);
        const newCheckIn = new Date(checkIn);
        const newCheckOut = new Date(checkOut);
        
        return (newCheckIn < resCheckOut && newCheckOut > resCheckIn);
    });
    
    return conflictingReservations.length === 0;
}

function addVirtualTour() {
    return `
        <div class="virtual-tour-section mb-4">
            <h3>360° Sanal Tur</h3>
            <div class="ratio ratio-16x9">
                <iframe src="360-tour-url" allowfullscreen></iframe>
            </div>
        </div>
    `;
}

function compareRooms(room1Id, room2Id) {
    const room1 = rooms.find(r => r.id === room1Id);
    const room2 = rooms.find(r => r.id === room2Id);
    
    return `
        <div class="comparison-table">
            <table class="table">
                <tr>
                    <th>Özellik</th>
                    <th>${room1.name}</th>
                    <th>${room2.name}</th>
                </tr>
                <tr>
                    <td>Fiyat</td>
                    <td>${room1.price} TL</td>
                    <td>${room2.price} TL</td>
                </tr>
                <!-- Diğer özellikler -->
            </table>
        </div>
    `;
}

function showAvailabilityCalendar(roomId) {
    const room = rooms.find(r => r.id === roomId);
    const reservations = getReservations();
    const roomReservations = reservations.filter(r => r.roomId === roomId);
    
    // Takvim oluşturma
    return `
        <div class="availability-calendar">
            <div id="calendar"></div>
        </div>
    `;
}

const faqHTML = `
    <div class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
            Check-in ve Check-out saatleri nedir?
        </button>
    </div>
`;

const languages = {
    tr: {
        rooms: 'Odalar',
        services: 'Hizmetler',
        contact: 'İletişim',
        // ... diğer çeviriler
    },
    en: {
        rooms: 'Rooms',
        services: 'Services',
        contact: 'Contact',
        // ... diğer çeviriler
    }
};

function changeLang(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = languages[lang][key];
    });
}

async function getWeather() {
    const weatherDiv = document.getElementById('weather');
    try {
        const response = await fetch('https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=HOTEL_LOCATION');
        const data = await response.json();
        weatherDiv.innerHTML = `
            <div class="weather-info">
                <i class="fas fa-sun"></i>
                <span>${data.current.temp_c}°C</span>
                <small>${data.current.condition.text}</small>
            </div>
        `;
    } catch (error) {
        console.error('Hava durumu bilgisi alınamadı:', error);
    }
}

class LoyaltyProgram {
    constructor(user) {
        this.user = user;
        this.points = 0;
    }

    addPoints(amount) {
        this.points += amount;
        this.checkLevel();
    }

    checkLevel() {
        if (this.points >= 1000) return 'Gold';
        if (this.points >= 500) return 'Silver';
        return 'Bronze';
    }

    getDiscountRate() {
        const level = this.checkLevel();
        const discounts = {
            Gold: 0.15,
            Silver: 0.10,
            Bronze: 0.05
        };
        return discounts[level];
    }
}

// Canlı Destek Widget Kontrolü
document.addEventListener('DOMContentLoaded', () => {
    const chatWidget = document.querySelector('.chat-widget');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input input');
    const chatSend = document.querySelector('.chat-input button');
    const chatMessages = document.querySelector('.chat-messages');

    // Chat widget'ı başlangıçta gizle
    chatWidget.style.display = 'none';

    // Chat açma butonu
    const chatButton = document.createElement('button');
    chatButton.className = 'chat-open-button';
    chatButton.innerHTML = '<i class="fas fa-comments"></i>';
    document.body.appendChild(chatButton);

    chatButton.addEventListener('click', () => {
        chatWidget.style.display = 'block';
        chatButton.style.display = 'none';
    });

    closeChat.addEventListener('click', () => {
        chatWidget.style.display = 'none';
        chatButton.style.display = 'block';
    });

    // Mesaj gönderme
    chatSend.addEventListener('click', () => {
        if (chatInput.value.trim()) {
            const message = document.createElement('div');
            message.className = 'chat-message user-message';
            message.textContent = chatInput.value;
            chatMessages.appendChild(message);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Otomatik yanıt
            setTimeout(() => {
                const response = document.createElement('div');
                response.className = 'chat-message bot-message';
                response.textContent = 'Size nasıl yardımcı olabilirim?';
                chatMessages.appendChild(response);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    });

    // Enter tuşu ile mesaj gönderme
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            chatSend.click();
        }
    });
});

// Oda Karşılaştırma
function compareRooms() {
    const room1 = document.getElementById('room1').value;
    const room2 = document.getElementById('room2').value;
    
    if (!room1 || !room2) {
        alert('Lütfen karşılaştırmak için iki oda seçin');
        return;
    }

    const comparisonResult = document.getElementById('comparisonResult');
    // Karşılaştırma sonuçlarını göster
    comparisonResult.innerHTML = `
        <div class="comparison-table mt-4">
            <table class="table">
                <tr>
                    <th>Özellikler</th>
                    <th>${getRoomName(room1)}</th>
                    <th>${getRoomName(room2)}</th>
                </tr>
                <!-- Karşılaştırma detayları -->
            </table>
        </div>
    `;
}

// Sanal Concierge Hizmeti
function requestService(serviceType) {
    const services = {
        'room-service': 'Oda Servisi',
        'housekeeping': 'Oda Temizliği',
        'maintenance': 'Teknik Destek',
        'wake-up': 'Uyandırma Servisi'
    };

    const message = `${services[serviceType]} talebiniz alınmıştır. En kısa sürede size yardımcı olacağız.`;
    alert(message);
}

// Oda isimlerini getir
function getRoomName(roomType) {
    const roomNames = {
        'standard': 'Standart Oda',
        'deluxe': 'Deluxe Oda',
        'suite': 'Suit Oda'
    };
    return roomNames[roomType];
}

function bookSpaService(serviceType) {
    const services = {
        'massage': 'Klasik Masaj',
        'aromatherapy': 'Aromaterapi',
        'stone': 'Taş Masajı'
    };

    const modal = new bootstrap.Modal(document.getElementById('spaModal') || createSpaModal());
    document.getElementById('spaServiceType').value = serviceType;
    document.getElementById('spaModalLabel').textContent = `${services[serviceType]} Randevusu`;
    modal.show();
}

function createSpaModal() {
    const modalHTML = `
        <div class="modal fade" id="spaModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="spaModalLabel">Spa Randevusu</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="spaBookingForm">
                            <input type="hidden" id="spaServiceType">
                            <div class="mb-3">
                                <label class="form-label">Tarih</label>
                                <input type="date" class="form-control" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Saat</label>
                                <select class="form-select" required>
                                    <option value="">Saat Seçin</option>
                                    <option>10:00</option>
                                    <option>11:30</option>
                                    <option>14:00</option>
                                    <option>15:30</option>
                                    <option>17:00</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Not (Opsiyonel)</label>
                                <textarea class="form-control"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
                        <button type="button" class="btn btn-primary" onclick="confirmSpaBooking()">Randevuyu Onayla</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    return document.getElementById('spaModal');
}

function confirmSpaBooking() {
    // Randevu onaylama işlemi
    alert('Randevunuz başarıyla oluşturuldu!');
    bootstrap.Modal.getInstance(document.getElementById('spaModal')).hide();
}

// Kullanıcı İşlemleri
class UserService {
    constructor() {
        this.currentUser = null;
    }

    async login(email, password) {
        try {
            // API çağrısı simülasyonu
            const response = await new Promise(resolve => setTimeout(() => {
                resolve({
                    success: true,
                    user: {
                        id: 1,
                        name: 'Test Kullanıcı',
                        email: email,
                        points: 100
                    }
                });
            }, 1000));

            if (response.success) {
                this.currentUser = response.user;
                this.updateUI();
                return true;
            }
        } catch (error) {
            console.error('Giriş hatası:', error);
            return false;
        }
    }

    logout() {
        this.currentUser = null;
        this.updateUI();
    }

    updateUI() {
        const guestMenu = document.getElementById('guestMenu');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');

        if (this.currentUser) {
            guestMenu.style.display = 'none';
            userMenu.style.display = 'block';
            userName.textContent = this.currentUser.name;
        } else {
            guestMenu.style.display = 'block';
            userMenu.style.display = 'none';
            userName.textContent = 'Hesabım';
        }
    }
}

// Ödeme İşlemleri
class PaymentService {
    constructor() {
        this.paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
    }

    async processPayment(paymentDetails) {
        try {
            // Sanal POS entegrasyonu simülasyonu
            const response = await new Promise(resolve => setTimeout(() => {
                resolve({
                    success: true,
                    transactionId: 'TRX' + Math.random().toString(36).substr(2, 9)
                });
            }, 2000));

            if (response.success) {
                alert('Ödeme başarıyla tamamlandı!');
                return response.transactionId;
            }
        } catch (error) {
            console.error('Ödeme hatası:', error);
            alert('Ödeme işlemi başarısız!');
            return null;
        }
    }

    showPaymentModal(bookingDetails) {
        document.getElementById('bookingSummary').innerHTML = `
            <p>Oda: ${bookingDetails.roomName}</p>
            <p>Tarih: ${bookingDetails.checkIn} - ${bookingDetails.checkOut}</p>
            <p>Kişi Sayısı: ${bookingDetails.guests}</p>
        `;
        document.getElementById('totalAmount').textContent = `${bookingDetails.totalPrice} TL`;
        this.paymentModal.show();
    }
}

// Dinamik Fiyatlandırma
class PricingService {
    calculatePrice(basePrice, checkIn, checkOut, guests) {
        let totalPrice = basePrice;

        // Sezon faktörü
        const season = this.getSeason(checkIn);
        totalPrice *= season.factor;

        // Doluluk oranı faktörü
        const occupancy = this.getOccupancyRate(checkIn, checkOut);
        totalPrice *= (1 + (occupancy / 100) * 0.5);

        // Kişi sayısı faktörü
        if (guests > 2) {
            totalPrice *= (1 + ((guests - 2) * 0.2));
        }

        return Math.round(totalPrice);
    }

    getSeason(date) {
        const month = new Date(date).getMonth();
        if (month >= 5 && month <= 8) return { name: 'Yüksek Sezon', factor: 1.5 };
        if (month >= 9 && month <= 11) return { name: 'Orta Sezon', factor: 1.2 };
        return { name: 'Düşük Sezon', factor: 1 };
    }

    getOccupancyRate(checkIn, checkOut) {
        // Doluluk oranı simülasyonu
        return Math.floor(Math.random() * 100);
    }
}

// Servisleri başlat
const userService = new UserService();
const paymentService = new PaymentService();
const pricingService = new PricingService();

// Event Listeners
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    await userService.login(email, password);
    bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
});

document.getElementById('paymentForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const result = await paymentService.processPayment({
        cardNumber: e.target.elements.cardNumber.value,
        // diğer kart detayları
    });
    if (result) {
        paymentService.paymentModal.hide();
    }
});