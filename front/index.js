document.addEventListener('DOMContentLoaded', () => {
    // 1. GESTION DU MODE SOMBRE / CLAIR (Dark / Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // Charger le thème enregistré dans le localStorage s'il existe
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        htmlElement.classList.remove('dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    // Basculer le thème au clic
    themeToggleBtn.addEventListener('click', () => {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // 2. BOUTON D'IMPRESSION / TÉLÉCHARGEMENT PDF
    const printBtn = document.getElementById('print-btn');
    printBtn.addEventListener('click', () => {
        window.print();
    });

    // 3. COPIE RAPIDE DE L'E-MAIL AVEC NOTIFICATION TOAST
    const copyEmailBtn = document.getElementById('copy-email');
    const emailText = document.getElementById('email-text').textContent;
    const toast = document.getElementById('toast');

    copyEmailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(emailText).then(() => {
            // Afficher le toast
            toast.classList.remove('translate-y-20', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');

            // Masquer le toast après 2,5 secondes
            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 2500);
        }).catch(err => {
            console.error('Erreur lors de la copie : ', err);
        });
    });

    // 4. FILTRE DYNAMIQUE DES COMPÉTENCES
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Gérer l'état actif des boutons de filtre
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-indigo-600', 'text-white', 'active');
                btn.classList.add('bg-slate-100', 'dark:bg-slate-700', 'hover:bg-slate-200', 'dark:hover:bg-slate-600');
            });
            button.classList.remove('bg-slate-100', 'dark:bg-slate-700', 'hover:bg-slate-200', 'dark:hover:bg-slate-600');
            button.classList.add('bg-indigo-600', 'text-white', 'active');

            const filterValue = button.getAttribute('data-filter');

            // Filtrer les cartes
            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});