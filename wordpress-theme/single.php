<?php get_header(); ?>

<main id="main" class="site-main">
    <!-- Breadcrumb -->
    <nav style="background: #f3f4f6; padding: 1rem 0; border-bottom: 1px solid #e5e7eb;">
        <div class="container">
            <div style="font-size: 0.875rem; color: #6b7280;">
                <a href="<?php echo home_url(); ?>" style="color: #6b7280; text-decoration: none;">🏠 Home</a>
                <span style="margin: 0 0.5rem;">›</span>
                <a href="<?php echo home_url('/blog'); ?>" style="color: #6b7280; text-decoration: none;">Blog</a>
                <span style="margin: 0 0.5rem;">›</span>
                <span style="color: #1f2937; font-weight: 500;"><?php the_title(); ?></span>
            </div>
        </div>
    </nav>

    <?php if (have_posts()) : ?>
        <?php while (have_posts()) : the_post(); ?>
            <article style="padding: 5rem 0;">
                <div class="container">
                    <div style="max-width: 800px; margin: 0 auto;">
                        <!-- Article Header -->
                        <header style="text-align: center; margin-bottom: 3rem;">
                            <div style="margin-bottom: 1rem;">
                                <span style="background: #fef3c7; color: #f59e0b; padding: 0.5rem 1rem; border-radius: 12px; font-size: 0.875rem; font-weight: 600;">
                                    <?php echo get_the_category_list(', '); ?>
                                </span>
                            </div>
                            <h1 style="font-size: 2.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem; line-height: 1.2;">
                                <?php the_title(); ?>
                            </h1>
                            <div style="display: flex; justify-content: center; gap: 1rem; color: #6b7280; font-size: 0.875rem;">
                                <div style="display: flex; align-items: center;">
                                    <span style="margin-right: 0.25rem;">📅</span>
                                    <?php echo get_the_date('j. F Y'); ?>
                                </div>
                                <div style="display: flex; align-items: center;">
                                    <span style="margin-right: 0.25rem;">👤</span>
                                    <?php the_author(); ?>
                                </div>
                                <div style="display: flex; align-items: center;">
                                    <span style="margin-right: 0.25rem;">🕐</span>
                                    <?php echo reading_time(); ?> Min. Lesezeit
                                </div>
                            </div>
                        </header>

                        <!-- Featured Image -->
                        <?php if (has_post_thumbnail()) : ?>
                            <div style="margin-bottom: 3rem;">
                                <?php the_post_thumbnail('large', array('style' => 'width: 100%; height: 400px; object-fit: cover; border-radius: 12px;')); ?>
                            </div>
                        <?php endif; ?>

                        <!-- Article Content -->
                        <div style="font-size: 1.125rem; line-height: 1.8; color: #374151;">
                            <?php the_content(); ?>
                        </div>

                        <!-- Article Footer -->
                        <footer style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e5e7eb;">
                            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                                <div>
                                    <?php if (get_the_tags()) : ?>
                                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                            <?php
                                            $tags = get_the_tags();
                                            foreach ($tags as $tag) {
                                                echo '<span style="background: #f3f4f6; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.875rem; color: #6b7280;">#' . $tag->name . '</span>';
                                            }
                                            ?>
                                        </div>
                                    <?php endif; ?>
                                </div>
                                <div>
                                    <a href="<?php echo home_url('/blog'); ?>" style="color: #f59e0b; text-decoration: none; font-weight: 600;">
                                        ← Alle Artikel
                                    </a>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </article>

            <!-- Related Articles -->
            <section style="padding: 3rem 0; background: #f9fafb;">
                <div class="container">
                    <div style="max-width: 800px; margin: 0 auto;">
                        <h3 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-bottom: 2rem; text-align: center;">
                            Weitere interessante Artikel
                        </h3>
                        
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
                            <?php
                            $related_posts = get_posts(array(
                                'posts_per_page' => 3,
                                'exclude' => array(get_the_ID()),
                                'orderby' => 'rand'
                            ));
                            
                            foreach ($related_posts as $post) :
                                setup_postdata($post);
                            ?>
                                <div style="background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
                                    <?php if (has_post_thumbnail()) : ?>
                                        <a href="<?php the_permalink(); ?>">
                                            <?php the_post_thumbnail('medium', array('style' => 'width: 100%; height: 150px; object-fit: cover;')); ?>
                                        </a>
                                    <?php endif; ?>
                                    
                                    <div style="padding: 1.5rem;">
                                        <h4 style="font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;">
                                            <a href="<?php the_permalink(); ?>" style="color: #1f2937; text-decoration: none;">
                                                <?php the_title(); ?>
                                            </a>
                                        </h4>
                                        <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1rem;">
                                            <?php echo wp_trim_words(get_the_excerpt(), 15); ?>
                                        </p>
                                        <a href="<?php the_permalink(); ?>" style="color: #f59e0b; text-decoration: none; font-weight: 600; font-size: 0.875rem;">
                                            Weiterlesen →
                                        </a>
                                    </div>
                                </div>
                            <?php 
                            endforeach;
                            wp_reset_postdata();
                            ?>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA -->
            <section style="padding: 3rem 0; background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: #fff;">
                <div class="container">
                    <div style="text-center;">
                        <h3 style="font-size: 1.75rem; font-weight: bold; margin-bottom: 1rem;">
                            Benötigen Sie eine Fahrt?
                        </h3>
                        <p style="font-size: 1.125rem; margin-bottom: 1.5rem; opacity: 0.9;">
                            Buchen Sie jetzt Ihr Taxi - 24/7 verfügbar!
                        </p>
                        
                        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                            <a href="tel:076 611 31 31" class="btn" style="background: #fff; color: #f59e0b; padding: 0.75rem 1.5rem; font-weight: bold;">
                                📞 076 611 31 31
                            </a>
                            <a href="<?php echo home_url('/buchen'); ?>" class="btn" style="background: #d97706; color: #fff; padding: 0.75rem 1.5rem; font-weight: bold;">
                                🚗 Online Buchen
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        <?php endwhile; ?>
    <?php endif; ?>
</main>

<?php
// Reading time function
function reading_time() {
    $content = get_post_field('post_content', get_the_ID());
    $word_count = str_word_count(strip_tags($content));
    $reading_time = ceil($word_count / 200);
    return $reading_time;
}
?>

<?php get_footer(); ?>