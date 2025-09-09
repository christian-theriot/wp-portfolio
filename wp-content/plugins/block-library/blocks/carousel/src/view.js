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
        this.slideContainer = this.slider.querySelector('.slides');
        this.perPage = this.slideContainer.getAttribute('data-num-cards')
            ? this.slideContainer.getAttribute('data-num-cards')
            : 3;
        this.offset = this.perPage - 1;
        this.slides = this.slideContainer.querySelectorAll('.wp-block-block-library-carousel-card');
        this.controls = {
            prev: this.slider.querySelector('.btn-prev'),
            next: this.slider.querySelector('.btn-next')
        }

        new KeyScrollEvent(this.goToPrevSlide.bind(this), this.goToNextSlide.bind(this));

        this.setup();
    }

    setup() {
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].classList.add((i < this.perPage) ? 'selected' : 'hidden');

            if (i < this.perPage) {
                this.slides[i].style.left = (10 + (i * 20)) + 'rem';
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

            this.slides[idx].style.left = (10 + (i * 20)) + 'rem';
        }
    }

    goToPrevSlide(e) {
        e?.preventDefault();

        if (this.selected <= this.perPage - 1) {
            this.controls.prev.classList.add('hidden');
            this.selected = this.perPage - 1;
            return;
        }

        this.slides[this.selected].classList.remove('selected');
        this.slides[this.selected - this.perPage].classList.add('selected');
        this.selected--;
        this.controls.next.classList.remove('hidden');

        this._setOffsetsAtCurrentPosition();

        if (this.selected == this.perPage - 1) {
            this.controls.prev.classList.add('hidden');
        }
    }

    goToNextSlide(e) {
        e?.preventDefault();

        if (this.selected >= this.slides.length - 1) {
            this.controls.next.classList.add('hidden');
            this.selected = this.slides.length - 1;
            return;
        }

        this.selected++;
        this.slides[this.selected].classList.add('selected');
        this.slides[this.selected - this.perPage].classList.remove('selected');
        this.controls.prev.classList.remove('hidden');

        this._setOffsetsAtCurrentPosition();

        if (this.selected == this.slides.length - 1) {
            this.controls.next.classList.add('hidden');
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const carousel = new Carousel();
});
