export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      compositions: {
        Row: {
          audio_url: string | null
          content: string | null
          created_at: string
          id: number
          title: string
          user_id: string | null
        }
        Insert: {
          audio_url?: string | null
          content?: string | null
          created_at?: string
          id?: never
          title: string
          user_id?: string | null
        }
        Update: {
          audio_url?: string | null
          content?: string | null
          created_at?: string
          id?: never
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      programmings: {
        Row: {
          allowances: number | null
          annual_budget: number | null
          assistance_details: string | null
          consumption_materials: number | null
          created_at: string
          end_date: string
          execution_end_date: string | null
          execution_start_date: string | null
          experiment: string | null
          fuel: number | null
          has_available_resources: boolean | null
          id: string
          insurance: number | null
          investments: number | null
          name: string
          needs_assistance: boolean | null
          project_summary: string | null
          project_type: string | null
          resource_execution_date: string | null
          start_date: string
        }
        Insert: {
          allowances?: number | null
          annual_budget?: number | null
          assistance_details?: string | null
          consumption_materials?: number | null
          created_at?: string
          end_date: string
          execution_end_date?: string | null
          execution_start_date?: string | null
          experiment?: string | null
          fuel?: number | null
          has_available_resources?: boolean | null
          id?: string
          insurance?: number | null
          investments?: number | null
          name: string
          needs_assistance?: boolean | null
          project_summary?: string | null
          project_type?: string | null
          resource_execution_date?: string | null
          start_date: string
        }
        Update: {
          allowances?: number | null
          annual_budget?: number | null
          assistance_details?: string | null
          consumption_materials?: number | null
          created_at?: string
          end_date?: string
          execution_end_date?: string | null
          execution_start_date?: string | null
          experiment?: string | null
          fuel?: number | null
          has_available_resources?: boolean | null
          id?: string
          insurance?: number | null
          investments?: number | null
          name?: string
          needs_assistance?: boolean | null
          project_summary?: string | null
          project_type?: string | null
          resource_execution_date?: string | null
          start_date?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          category_value: string
          created_at: string
          fields: Json
          id: string
          item: string
          programming_id: string
          type: string
        }
        Insert: {
          category_value: string
          created_at?: string
          fields?: Json
          id?: string
          item: string
          programming_id: string
          type: string
        }
        Update: {
          category_value?: string
          created_at?: string
          fields?: Json
          id?: string
          item?: string
          programming_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "resources_programming_id_fkey"
            columns: ["programming_id"]
            isOneToOne: false
            referencedRelation: "programmings"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
