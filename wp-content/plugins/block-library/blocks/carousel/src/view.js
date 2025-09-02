class KeyScrollEvent {
    constructor(onLeft, onRight) {
        this.onLeft = onLeft;
        this.onRight = onRight;

        document.addEventListener('keyup', this.keyup.bind(this));
    }

    keyup(e) {
        e.preventDefault();

        switch (e.key) {
            case 'ArrowLeft':
                this.onLeft();
                break;

            case 'ArrowRight':
                this.onRight();
                break;
        }
    }
}

class Carousel {
    constructor() {
        this.slider = document.querySelector('.slider');
        this.perPage = this.slider.getAttribute('data-num-cards')
            ? parseInt(this.slider.getAttribute('data-num-cards'))
            : 3;
        this.offset = this.perPage - 1;
        this.cards = this.slider.querySelectorAll('.wp-block-block-library-carousel-card');
        this.controls = {
            prev: this.slider.querySelector('.dashicons-arrow-left-alt2'),
            next: this.slider.querySelector('.dashicons-arrow-right-alt2')
        }

        new KeyScrollEvent(this.goToPrevSlide.bind(this), this.goToNextSlide.bind(this));

        this.setup();
    }

    setup() {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].classList.add((i < this.perPage) ? 'selected' : 'hidden');

            if (i < this.perPage) {
                this.cards[i].style.left = (10 + (i * 20)) + 'rem';
            }
        }

        this.selected = this.offset;
        this.controls.prev.classList.add('hidden');

        this.controls.prev.addEventListener('click', this.goToPrevSlide.bind(this));
        this.controls.next.addEventListener('click', this.goToNextSlide.bind(this));
    }

    _setOffsetsAtCurrentPosition() {
        for (let i = 0; i < this.perPage; i++) {
            const idx = this.selected - this.offset + i;

            this.cards[idx].style.left = (10 + (i * 20)) + 'rem';
        }
    }

    goToPrevSlide(e) {
        e?.preventDefault();

        if (this.selected <= this.perPage - 1) {
            this.controls.prev.classList.add('hidden');
            this.selected = this.perPage - 1;
            return;
        }

        this.cards[this.selected].classList.remove('selected');
        this.cards[this.selected - this.perPage].classList.add('selected');
        this.selected--;
        this.controls.next.classList.remove('hidden');

        this._setOffsetsAtCurrentPosition();

        if (this.selected == this.perPage - 1) {
            this.controls.prev.classList.add('hidden');
        }
    }

    goToNextSlide(e) {
        e?.preventDefault();

        if (this.selected >= this.cards.length - 1) {
            this.controls.next.classList.add('hidden');
            this.selected = this.cards.length - 1;
            return;
        }

        this.selected++;
        this.cards[this.selected].classList.add('selected');
        this.cards[this.selected - this.perPage].classList.remove('selected');
        this.controls.prev.classList.remove('hidden');

        this._setOffsetsAtCurrentPosition();

        if (this.selected == this.cards.length - 1) {
            this.controls.next.classList.add('hidden');
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const carousel = new Carousel();
})
