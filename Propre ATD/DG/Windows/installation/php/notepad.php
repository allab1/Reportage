<?php
# Sample PHP-GTK2 Application 0001: Notepad
# Description: A desktop Notepad application similar to window's Notepad.exe
# Author: kksou
# June 16, 2008

$app = new NotePad();
Gtk::main();

class NotePad {
	protected $glade;      // glade
	protected $filename;   // filename
	protected $view;       // the textview
	protected $buffer;     // the corresponding text buffer
	protected $clipboard;  // clipboard

	function __construct() {
		// setup glade
		$glade = new GladeXML(dirname(__FILE__).'/notepad.glade');
		$glade->signal_autoconnect_instance($this);
		$this->glade = $glade;

		// setup textview and textbuffer
		$this->buffer = new GtkTextBuffer();
		$this->view = $glade->get_widget('textview1');
		$this->view->set_buffer($this->buffer);

		// some other inititalization
		$this->filename = '';
		$this->set_title();
		$this->clipboard = new GtkClipboard($this->view->get_display(), Gdk::atom_intern('CLIPBOARD'));
		$this->on_wordwrap_toggled($glade->get_widget('menuitem_wordwrap'));

		// setup signal handlers
		$this->buffer->connect('modified-changed', array(&$this, 'on_modified_changed'));

	}

	function set_title($modified = false) {
		$filename = $this->filename;
		if ($filename=='') $filename = 'Untitled';
		if ($modified) $title = $filename.' (*) - php-gtk2 Notepad';
		else $title = $filename.' - php-gtk2 Notepad';
		$this->glade->get_widget('window1')->set_title($title);
	}

	// process menu item selection
	public function on_menu_select($menu_item) {
		$item = $menu_item->child->get_label();
		$item2 = strtolower($item);
		$item2 = preg_replace(array('/_/','/\./','#/#','/\s/ '), array('','','_','_'), $item2);
		if (preg_match('/^(new|open|save)$/', $item2, $matches)) $item2='file_'.$matches[1];
		echo "menu selected: $item ($item2)\n";
		$this->$item2();
		if ($item=='_Quit') Gtk::main_quit();
	}

	protected function file_new() {
		$this->buffer->set_text('');
		$this->buffer->set_modified(false);
		$this->filename = '';
		$this->set_title();
	}

	protected function file_open() {
		$dialog = new GtkFileChooserDialog("File Open", null, Gtk::FILE_CHOOSER_ACTION_OPEN, array(Gtk::STOCK_OK, Gtk::RESPONSE_OK), null);
		if ($dialog->run() == Gtk::RESPONSE_OK) {
			$this->filename = $dialog->get_filename();
			echo "selected_file = $this->filename\n";
			$contents = file_get_contents($this->filename);
			$this->buffer->set_text($contents);
			$this->buffer->set_modified(false);
			$this->set_title();
		}
		$dialog->destroy();
	}

	protected function file_save() {
		print "File Save";
		if ($this->filename!='') $this->save_buffer();
		else $this->save_as();
	}

	protected function save_as() {
		$dialog = new GtkFileChooserDialog("File Save", null, Gtk::FILE_CHOOSER_ACTION_SAVE, array(Gtk::STOCK_OK, Gtk::RESPONSE_OK), null);
		if ($dialog->run() == Gtk::RESPONSE_OK) {
			$this->filename = $dialog->get_filename();
			$this->save_buffer();
		}
		$dialog->destroy();
	}

	protected function save_buffer() {
		$buffer_str = $this->buffer->get_text($this->buffer->get_start_iter(), $this->buffer->get_end_iter());
		file_put_contents($this->filename, $buffer_str);
		$this->buffer->set_modified(false);
		$this->set_title();
	}

	protected function cut() {
		$this->buffer->cut_clipboard($this->clipboard, $this->view->get_editable());
	}

	protected function copy() {
		$this->buffer->copy_clipboard($this->clipboard);
	}

	protected function paste() {
		$this->buffer->paste_clipboard($this->clipboard, null, true);
	}

	protected function delete() {
		$this->buffer->delete_selection(true, $this->view->get_editable());
	}

	protected function find() {
		$dialog = $this->glade->get_widget('find_dialog');
		$this->glade->get_widget('search_entry')->set_text('');
		if ($dialog->run() == 101) {
			$this->search_str = $this->glade->get_widget('search_entry')->get_text();
			$current_insert_position = $this->buffer->get_iter_at_mark($this->buffer->get_insert());
			$this->search($this->search_str, $current_insert_position);
		}
		$dialog->hide();
	}

	protected function find_next() {
		$last_search_pos = $this->buffer->get_mark('last_search_pos');
		if ($last_search_pos==null) {print "last_search_iter undefined\n"; return;}
		$last_search_iter = $this->buffer->get_iter_at_mark($last_search_pos);
		$this->search($this->search_str, $last_search_iter);
	}

	protected function search($str, $current_insert_pos) {
		$buffer = $this->buffer;
		$found = $this->search_range($str, $current_insert_pos, $buffer->get_end_iter());
		if (!$found) $this->search_range($str, $buffer->get_start_iter(), $current_insert_pos);
	}

	protected function search_range($str, $start_iter, $end_iter) {
		$buffer = $this->buffer;
		$match_start = $start_iter;
		$match_end = $end_iter;
		$found = $start_iter->forward_search($str, 0, $match_start, $match_end, null);
		if ($found) {
			$buffer->select_range($match_start, $match_end);
			$buffer->create_mark('last_search_pos', $match_end, false);
		}
		return $found;
	}

	public function on_search_entry_activate($entry) {
		$this->glade->get_widget('search_button')->clicked();
	}

	public function on_search_button_clicked($button) {
		$this->glade->get_widget('find_dialog')->response(101);
	}

	protected function select_all() {
		$this->buffer->select_range($this->buffer->get_start_iter(), $this->buffer->get_end_iter());
	}

	protected function time_date() {
		$this->buffer->insert_at_cursor(date('h:i A n/j/Y'));
	}

	public function on_wordwrap_toggled($menuitem) {
		$active = $menuitem->get_active();
		if ($menuitem->get_active()) $this->view->set_wrap_mode(Gtk::WRAP_WORD);
		else $this->view->set_wrap_mode(Gtk::WRAP_NONE);
	}

	protected function font() {
		$dialog = new GtkFontSelectionDialog('Select Font');
         if ($dialog->run() == Gtk::RESPONSE_OK) {
            $fontname = $dialog->get_font_name();
            $this->view->modify_font(new PangoFontDescription($fontname));
        }
        $dialog->destroy();
	}

	protected function about() {
		$dialog = new GtkAboutDialog();
		$dialog->set_name('PHP-GTK2 Notepad');
		$dialog->set_version('1.0');
		$dialog->set_comments("A desktop Notepad application using PHP-GTK2\nwritten by kksou\n\nJune 16, 2008");
		$dialog->run();
		$dialog->destroy();
	}

	public function on_modified_changed($buffer) {
		$this->set_title(true);
	}

}

?>