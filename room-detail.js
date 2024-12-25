// URL'den oda ID'sini al
const urlParams = new URLSearchParams(window.location.search);
const roomId = parseInt(urlParams.get('id'));

// Odalar verisi
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
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
        description: 'Geniş ve lüks deluxe odalarımız',
        capacity: 3,
        images: [
            'https://images.unsplash.com/photo-1590490360182-c33d57733427',
            'https://images.unsplash.com/photo-1595576508898-0ad5c879a061',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'
        ]
    },
    // ... diğer odalar
];

// Seçilen odayı bul
const selectedRoom = rooms.find(room => room.id === roomId);

// Örnek yorumlar
const reviews = [
    {
        name: "Ahmet Y.",
        date: "2024-02-15",
        rating: 5,
        comment: "Odanın temizliği ve konforu mükemmeldi. Personel çok ilgiliydi. Kesinlikle tekrar tercih edeceğim."
    },
    {
        name: "Ayşe K.",
        date: "2024-02-10",
        rating: 4.5,
        comment: "Çok güzel bir konaklama deneyimiydi. Özellikle yatağın konforu harikaydı. Tek eksik ses yalıtımı biraz daha iyi olabilirdi."
    },
    {
        name: "Mehmet S.",
        date: "2024-02-05",
        rating: 5,
        comment: "Mükemmel bir deneyimdi. Özellikle bahçe manzarası çok huzur vericiydi. Kahvaltı da çok lezzetliydi."
    },
    {
        name: "Zeynep B.",
        date: "2024-01-28",
        rating: 4,
        comment: "Genel olarak güzeldi. Oda temiz ve bakımlıydı. Personel yardımseverdi."
    },
    {
        name: "Can M.",
        date: "2024-01-20",
        rating: 5,
        comment: "Fiyat/performans açısından çok iyi. Konumu merkezi ve ulaşımı kolay. Kesinlikle tavsiye ederim."
    }
];

// Yorumları sayfaya ekle
function displayReviews() {
    const container = document.querySelector('.reviews-container');
    let html = '';

    reviews.forEach(review => {
        const stars = '★'.repeat(Math.floor(review.rating)) + 
                     (review.rating % 1 ? '½' : '') + 
                     '☆'.repeat(5 - Math.ceil(review.rating));

        html += `
            <div class="review-item mb-4">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h5 class="mb-0">${review.name}</h5>
                    <small class="text-muted">${review.date}</small>
                </div>
                <div class="rating text-warning mb-2">${stars}</div>
                <p class="mb-0">${review.comment}</p>
                <hr>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Rezervasyon formu işleme
document.getElementById('reservationForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const guests = document.getElementById('guests').value;

    // Tarih kontrolü
    if (new Date(checkIn) >= new Date(checkOut)) {
        alert('Çıkış tarihi giriş tarihinden sonra olmalıdır!');
        return;
    }

    // Rezervasyon işlemi
    const totalNights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalPrice = totalNights * selectedRoom.price;

    const reservation = {
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        checkIn,
        checkOut,
        guests,
        totalPrice,
        totalNights,
        date: new Date().toISOString()
    };

    // LocalStorage'a kaydet
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));

    alert(
        'Rezervasyonunuz başarıyla alındı!\n\n' +
        `Oda: ${selectedRoom.name}\n` +
        `Giriş Tarihi: ${checkIn}\n` +
        `Çıkış Tarihi: ${checkOut}\n` +
        `Kişi Sayısı: ${guests}\n` +
        `Toplam Gece: ${totalNights}\n` +
        `Toplam Ücret: ${totalPrice} TL`
    );
    
    this.reset();
    bootstrap.Modal.getInstance(document.getElementById('reservationModal')).hide();
});

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Oda kontrolü
        if (!selectedRoom) {
            console.error('Oda bulunamadı');
            window.location.href = 'index.html';
            return;
        }

        // Sayfa başlığını güncelle
        document.title = `${selectedRoom.name} - LuxStay Hotel`;

        // DOM elementlerini güncelle
        const elements = {
            title: document.querySelector('.room-summary h2'),
            description: document.querySelector('.room-summary p.text-muted'),
            price: document.querySelector('.room-summary .text-primary'),
            capacity: document.querySelector('.fa-user'),
            carousel: document.querySelector('.carousel-inner')
        };

        // Element kontrolü
        Object.entries(elements).forEach(([key, element]) => {
            if (!element) {
                throw new Error(`${key} elementi bulunamadı`);
            }
        });

        // İçeriği güncelle
        elements.title.textContent = selectedRoom.name;
        elements.description.textContent = selectedRoom.description;
        elements.price.textContent = `${selectedRoom.price} TL / Gece`;
        elements.capacity.nextSibling.textContent = ` ${selectedRoom.capacity} Kişilik`;

        // Carousel resimleri güncelle
        if (selectedRoom.images && selectedRoom.images.length > 0) {
            elements.carousel.innerHTML = selectedRoom.images.map((img, index) => `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${img}" class="d-block w-100" alt="${selectedRoom.name} - Görünüm ${index + 1}">
                </div>
            `).join('');
        }

        // Yorumları göster
        displayReviews();

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

    } catch (error) {
        console.error('Hata:', error);
        // Hata durumunda kullanıcıya bilgi ver
        alert('Bir hata oluştu. Ana sayfaya yönlendiriliyorsunuz.');
        window.location.href = 'index.html';
    }
}); 