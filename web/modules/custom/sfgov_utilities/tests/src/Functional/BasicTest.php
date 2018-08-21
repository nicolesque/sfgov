<?php
  namespace Drupal\Tests\sfgov_utilities\Functional;

  use Drupal\Tests\BrowserTestBase;

  /**
   * Test basic functionality of sfgov_utilities module
   * 
   * @group sfgov_utilities
   */
  class BasicTest extends BrowserTestBase {
    
    /**
     * {@inheritdoc} 
     */
    public static $modules = [
      // Modules for core functionality
      'node',
      'views',
      'sfgov_utilites',
    ];

    /**
     * {@inheritdoc}
     */
    protected function setUp() {
      parent::setUp();

      // set the front page to 'node'
      \Drupal::configFactory()
        ->getEditable('system.site')
        ->set('page.front', '/node')
        ->save(TRUE);
    }

    /**
     * {@inheritdoc}
     */
    public function testTheSiteStillWorks() {
      // Load the front page
      $this->drupalGet('<front>');
      // Confirm drupal didn't throw up
      $this->assertSession()->statusCodeEquals(200);
      // Confirm that the front page contains the standard text
      // $this->assertText($this->t('Welcome to Drupal'));
    }
  }