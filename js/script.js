$(function () {
  /** Textarea avec message à l'intérieur **/
  $('.textarea-with-message-box textarea').focus(function () {
    $(this).parent('.textarea-with-message-box').find('.textarea-alert').addClass('focus');
  }).blur(function () {
    $(this).parent('.textarea-with-message-box').find('.textarea-alert').removeClass('focus');
  });

  // Get a reference to the file input element
  const inputElement = document.querySelector('.file-drop-drag');

  // Create the FilePond instance
  const pond = FilePond.create(inputElement, {
    allowMultiple: true,
    storeAsFile: true,
    disabled: false,
    labelIdle: "<i class='bx bxs-file-export'></i> Choisir un fichier",
    styleButtonRemoveItemPosition: 'right'
  });

})

$(document).ready(function () {

  var $form = $('#multiStepForm');        // Le formulaire multi-étapes
  var $slider = $('.questions-container');  // Conteneur Slick pour les étapes
  var ignoredSlides = [3, 4, 5, 6, 7];                         // Liste des étapes à ignorer

  // Initialisation de Slick
  // $slider.slick({
  //   infinite: false,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,  // On utilise les boutons personnalisés
  //   draggable: false,
  //   adaptiveHeight: true,  // Active l'ajustement dynamique de la hauteur
  //   swipe: false
  // });

  // Événement 'next' personnalisé
  $('.next-button').click(function () {
    var currentSlide = $slider.slick('slickCurrentSlide');
    var isValid = validateStep(currentSlide);

    if (isValid) {
      // Vérifier si l'étape suivante doit être ignorée
      var nextSlide = getNextSlide(currentSlide);
      $slider.slick('slickGoTo', nextSlide);
    }
  });

  // Événement 'previous' personnalisé
  $('.back-button').click(function () {
    var currentSlide = $slider.slick('slickCurrentSlide');
    var prevSlide = getPreviousSlide(currentSlide);
    $slider.slick('slickGoTo', prevSlide);
  });

  // Fonction de validation de l'étape
  function validateStep(stepIndex) {

    return true;
    // Implémente ici la logique pour vérifier les champs obligatoires de l'étape actuelle
    var isStepValid = true;
    $form.find(`.step-${stepIndex} [required]`).each(function () {
      if (!$(this).val()) {
        isStepValid = false;
        $(this).addClass('error');  // Marque le champ en erreur
      } else {
        $(this).removeClass('error');
      }
    });
    return isStepValid;
  }

  // Fonction pour obtenir l'étape suivante à afficher
  function getNextSlide(currentIndex) {
    var nextIndex = currentIndex + 1;
    while (ignoredSlides.includes(nextIndex) && nextIndex < $slider.slick('getSlick').slideCount) {
      nextIndex++;
    }
    return nextIndex;
  }

  // Fonction pour obtenir l'étape précédente à afficher
  function getPreviousSlide(currentIndex) {
    var prevIndex = currentIndex - 1;
    while (ignoredSlides.includes(prevIndex) && prevIndex >= 0) {
      prevIndex--;
    }
    return prevIndex;
  }


  $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    update_step(nextSlide);
  });
  // Logique pour gérer les étapes à ignorer selon les réponses
  // Ajouter ici la logique pour déterminer si une étape doit être ignorée
  // Exemple : if (someCondition) { ignoredSlides.push(slideIndex); }
});

function update_step(nextSlide) {
  var current_slide = nextSlide + 1;
  var prev_max_step = 0;
  $(".step-item").each(function () {
    console.log(this);
    var max_step = $(this).data("step-number");
    if (current_slide > prev_max_step && current_slide <= prev_max_step + max_step) {
      $(this).find(".step-item-loader-inner").css("width", ((current_slide - prev_max_step) * 100 / max_step) + "%");

    }
    else {
      per = 0;
      if (current_slide > prev_max_step) {
        var per = 100;
      }
      $(this).find(".step-item-loader-inner").css("width", per + "%");
    }
    prev_max_step += max_step;
  })
}

