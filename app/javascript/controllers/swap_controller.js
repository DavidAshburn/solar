import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = [
        'house1',
        'house2',
        'house3',
        'house4',
        'review1',
        'review2',
        'review3',
        'review4',
    ]
    
    connect() {
        this.pics = [
            this.house1Target,
            this.house2Target,
            this.house3Target,
            this.house4Target
        ];

        this.reviews = [
            this.review1Target,
            this.review2Target,
            this.review3Target,
            this.review4Target,
        ];

        this.index = 0;

    }

    next() {
        this.pics[this.index].classList.toggle('hidden');
        this.index++;
        this.pics[this.index].classList.toggle('hidden');
    }

    previous() {
        this.reviews[this.index].classList.toggle('hidden');
        this.index++;
        this.reviews[this.index].classList.toggle('hidden');
    }
}