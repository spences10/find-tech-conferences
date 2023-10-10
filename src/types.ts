declare interface ConferenceData {
	id: number;
	name: string;
	description: string | null;
	start_date: string;
	end_date: string;
	location: string;
	website_url: string | null;
	cfp_start_date: string | null;
	cfp_end_date: string | null;
	created_at: Date | null;
	updated_at: Date | null;
	approval_status: string | null;
}
